public class Config
{
  public string Label { get; set; }
  public class Parameter
  {
    public string Placeholder { get; set; }
    public bool Required { get; set; }
  }
  public Parameter[] Parameters { get; set; }
  
  public static readonly Config[] Items = new Config[]
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