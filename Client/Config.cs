internal class Config
{
  private string Label { get; set; }
  private class Parameter
  {
    private string Placeholder { get; set; }
    private bool Required { get; set; }
  }
  private Parameter[] Parameters { get; set; }
  
  internal static readonly Config[] Items = new Config[]
  {
    new Config { Label = "Disconnect" },
    new Config {
      Label = "Bind",
      Parameters = new Parameter[]
      {
        new Parameter { Placeholder = "The keyboard bind to use" , Required = true },
        new Parameter { Placeholder = "The command to trigger" , Required = true },
      }
    },
    new Config {
      Label = "Resource Bind",
      Parameters = new Parameter[]
      {
        new Parameter { Placeholder = "The keyboard bind to use only when that resource is started", Required = true },
        new Parameter { Placeholder = "The keyboard bind to use", Required = true },
        new Parameter { Placeholder = "The command to trigger", Required = true },
      }
    },
  };
}