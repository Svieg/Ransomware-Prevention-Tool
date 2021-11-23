import frida
import json
import psutil
import sys
from jinja2 import Environment, FileSystemLoader

def on_message(message, data):
    print("[on_message] message:", message, "data:", data)
    with open("out.log", "a") as log_file:
      log_file.write(message["payload"] + "\n")


processes = {}

# From https://thispointer.com/python-get-list-of-all-running-processes-and-sort-by-highest-memory-usage/
# Iterate over all running process
for proc in psutil.process_iter():
    try:
        # Get process name & pid from process object.
        # TODO: fix if multiple processes with same name
        processes[proc.name()] = str(proc.pid)
    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
        pass

print(processes)

processes = {"notepad.exe": processes["notepad.exe"], "steam.exe": processes["CmWebAdmin.exe"]}

processes_pids = ",".join("{}:{}".format(processes[proc_name], proc_name) for proc_name in processes.keys())

with open("out.log", "w") as out_file:
    out_file.write(processes_pids + "\n")

sessions = []

for process in processes:
  try:
    sessions.append(frida.attach(process))
    print(f"Attached to process: {process}")
  except:
    print(f"Can't attach to process: {process}")
    continue

# TODO: create load_json_file function
# Load monitored APIs
with open("monitored_apis_ranks.json") as monitored_apis_ranks_file:
    monitored_apis_ranks_file_content = monitored_apis_ranks_file.read()
monitored_apis_ranks = json.loads(monitored_apis_ranks_file_content)

# Load monitored registry keys
with open("monitored_reg_ranks.json") as monitored_reg_ranks_file:
    monitored_reg_ranks_file_content = monitored_reg_ranks_file.read()
monitored_reg_ranks = json.loads(monitored_reg_ranks_file_content)

# Render instrument.js template from file with monitored_apis_ranks functions hooked
env = Environment(loader=FileSystemLoader("./"))
template = env.get_template("instrument.js")
instrument_js = template.render({"function_names": monitored_apis_ranks.keys()})
for session in sessions:
    script = session.create_script(instrument_js)
    script.on("message", on_message)
    script.load()

    imported_apis = [m["name"] for m in script.exports.enumerate_modules()]

    threshold = 0

    for api in imported_apis:
        if api in monitored_apis_ranks:
            threshold += monitored_apis_ranks[api]

    # TODO: Hook explorer.exe, cmd.exe, powershell.exe for CreateProcess

    # TODO: Kill processes with big threshold

    print(f"Threshold: {threshold}")

sys.stdin.read()

for session in sessions:
  session.detach()
