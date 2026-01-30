using System;
using CitizenFX.Core;
using static CitizenFX.Core.Native.API;
using static lenix_sdk.Client.Modules;

public class Main : BaseScript
{
  private class BindARGS
  {
    internal string Command { get; set; }
  }
  public Main()
  {
    DefineCommand("sdk", () => Debug.WriteLine("sdk typed"));
    RegisterNuiCallback("execute", new Action<BindARGS, Action<bool>>((data, callback) =>
    {
      ExecuteCommand($"{data.Command}");
      callback(true);
    }));
    //@deprecated
    RegisterNuiCallback("getConfig", new Action<dynamic/* null */, Action<Config[]>>((data, callback) =>
    {
      Config[] config = Config.config;
      callback(config);
    }));
  }
}