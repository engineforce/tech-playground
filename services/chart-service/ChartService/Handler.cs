using Amazon.Lambda.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NLog;
using System;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace ChartService
{
    public class Handler
    {
        public Response Hello(Request request)
        {
            Console.WriteLine("Test C# in Mac.");
            TestJsonNet();
            TestNLog();
            new CommandPattern().Run("ON");

            return new Response("Go Serverless v2.0 with C#! Your function executed successfully!", request);
        }

        void TestJsonNet()
        {
            JArray array = new JArray();
            array.Add("Manual text");
            array.Add(new DateTime(2000, 5, 23));

            JObject o = new JObject();
            o["myArray"] = array;

            string json = o.ToString();
            Console.WriteLine(json);

            Account account = new Account
            {
                name = "John Doe",
                email = "john@nuget.org",
                dob = new DateTime(1980, 2, 20, 0, 0, 0, DateTimeKind.Utc),
            };

            json = JsonConvert.SerializeObject(account, Formatting.Indented);
            Console.WriteLine(json);
        }

        void TestNLog()
        {
            var config = new NLog.Config.LoggingConfiguration();

            var logfile = new NLog.Targets.FileTarget("logfile") { FileName = "file.txt" };
            var logconsole = new NLog.Targets.ConsoleTarget("logconsole");

            config.AddRule(LogLevel.Info, LogLevel.Fatal, logconsole);
            config.AddRule(LogLevel.Debug, LogLevel.Fatal, logfile);

            NLog.LogManager.Configuration = config;

            var logger = NLog.LogManager.GetCurrentClassLogger();
            logger.Info("Hello World");
        }
    }

    public class Response
    {
        public string Message { get; set; }
        public Request Request { get; set; }

        public Response(string message, Request request)
        {
            Message = message;
            Request = request;
        }
    }

    public class Request
    {
        public string Key1 { get; set; }
        public string Key2 { get; set; }
        public string Key3 { get; set; }

        public Request(string key1, string key2, string key3)
        {
            Key1 = key1;
            Key2 = key2;
            Key3 = key3;
        }
    }
}
