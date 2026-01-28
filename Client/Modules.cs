using System;
using System.Collections.Generic;
using CitizenFX.Core;
using static CitizenFX.Core.Native.API;

namespace lenix_sdk.Client {
  internal static class Modules
  {
    private static readonly bool IsCommandRestricted = false;
    internal static void DefineCommand(string commandName, Action callback)
    {
      RegisterCommand(commandName, new Action<int, List<object>, string>((source, args, rawCommand) =>
      {
        if (source > 0)
        {
          callback();
        }
        else
        {
          Debug.WriteLine("This command was executed by the server console, RCON client, or a resource.");
        }
      }), IsCommandRestricted);
    }
  }
}