using System;
using System.Collections.Generic;
using CitizenFX.Core;
using lenix_sdk.Client;
using static CitizenFX.Core.Native.API;

public class Main : BaseScript
{
  private class BindARGS
  {
    internal string Key { get; set; }
    internal string Command { get; set; }
  }
  private class ResourceBindARGS
  {
    internal string Resource { get; set; }
    internal string Key { get; set; }
    internal string Command { get; set; }
  }
  public Main()
  {
    Modules.DefineCommand("sdk", () => Debug.WriteLine("sdk typed"));
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
  }
}