using System;
using CitizenFX.Core;
using static CitizenFX.Core.Native.API;
using System.Collections.Generic;

public class Main : BaseScript
{
  private class BindARGS
  {
    internal string Command { get; set; }
  }
  private readonly string ShowMenuEventName = "showMenu";
  public Main()
  {
    EventHandlers[ShowMenuEventName] += new Action(() =>
    {
      SendNuiMessage(JsonConvert.SerializeObject(new {
        action = "showMenu"
      }));
    });
    TriggerServerEvent("defineTheCommand", "sdk", ShowMenuEventName);
    RegisterNuiCallback("execute", new Action<IDictionary<string, object>, CallbackDelegate>((data, callback) =>
    {
        var command = data["Command"].ToString();
        ExecuteCommand(command);
        callback("ok");
    }));
  }
}