using System;
using CitizenFX.Core;
using static CitizenFX.Core.Native.API;
using System.Collections.Generic;

public class Main : BaseScript
{
  private readonly string ShowMenuEventName = "showMenu";
  private readonly string NuiCallbacksParameter = "Command";
  public Main()
  {
    EventHandlers[ShowMenuEventName] += new Action(() =>
    {
      SendNuiMessage("{\"__name\": \"showMenu\"}");
      SetNuiFocus(true, true);
    });
    TriggerServerEvent("defineTheCommand", "sdk", ShowMenuEventName);
    RegisterNuiCallback("execute", new Action<IDictionary<string, object>, CallbackDelegate>((data, callback) =>
    {
        string command = data[NuiCallbacksParameter].ToString();
        ExecuteCommand(command);
        callback("ok");
    }));
  }
}