using System;
using CitizenFX.Core;
using static CitizenFX.Core.Native.API;
using System.Text.Json;

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
      SendNuiMessage(JsonSerializer.Serialize(new {
        action = "showMenu"
      }));
    });
    TriggerServerEvent("defineTheCommand", "sdk", ShowMenuEventName);
    RegisterNuiCallback("execute", new Action<BindARGS, Action<bool>>((data, callback) =>
    {
      ExecuteCommand($"{data.Command}");
      callback(true);
    }));
  }
}