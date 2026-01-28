using System;
using System.Collections.Generic;
using CitizenFX.Core;
using lenix_sdk.Client;
using static CitizenFX.Core.Native.API;

public class Main : BaseScript
{
  public Main()
  {
    Modules.DefineCommand("sdk", () => Debug.WriteLine("Hello"));
    RegisterNuiCallback("disconnect", new Action(() =>
    {
      ExecuteCommand("disconnect");
    }));
  }
}