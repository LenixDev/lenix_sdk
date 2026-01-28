using System;
using CitizenFX.Core;
using static CitizenFX.Core.Native.API;
using static lenix_sdk.Client.Modules;

public class Main : BaseScript
{
  private class BindARGS
  {
    internal string Key { get; set; }
    internal string Command { get; set; }
  }
  private class ResourceBindARGS : BindARGS
  {
    internal string Resource { get; set; }
  }
  public Main()
  {
    DefineCommand("sdk", () => Debug.WriteLine("sdk typed"));
    RegisterNuiCallback("disconnect", new Action<dynamic/* null */, Action<bool>>((data, callback) =>
    {
      ExecuteCommand("disconnect");
      callback(true);
    }));
    RegisterNuiCallback("bind", new Action<BindARGS, Action<bool>>((data, callback) =>
    {
      ExecuteCommand($"bind {data.Key} {data.Command}");
      callback(true);
    }));
    RegisterNuiCallback("resourcebind", new Action<ResourceBindARGS, Action<bool>>((data, callback) =>
    {
      ExecuteCommand($"rbind {data.Resource} {data.Key} {data.Command}");
      callback(true);
    }));
    RegisterNuiCallback("getConfig", new Action<dynamic/* null */, Action<Config[]>>((data, callback) =>
    {
      Config[] config = Config.Items;
      callback(config);
    }));
  }
}