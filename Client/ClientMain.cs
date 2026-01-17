using System.Threading.Tasks;
using CitizenFX.Core;
using static CitizenFX.Core.Native.API;

namespace lenix_sdk.Client {
  public class ClientMain : BaseScript {
    public ClientMain() {
      Debug.WriteLine("Hi from lenix_sdk.Client!");
    }

    [Tick]
    public Task OnTick() {
      DrawRect(0.5f, 0.5f, 0.5f, 0.5f, 255, 255, 255, 150);

      return Task.FromResult(0);
    }
  }
}