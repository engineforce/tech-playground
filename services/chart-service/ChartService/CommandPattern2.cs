namespace ChartService
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    class Document
    {
        private string _key;
        public Document(string key)
        {
            _key = key;
        }

        public string Copy()
        {
            return _key + ": Copy document";
        }

        public string Paste()
        {
            return  _key + ": Paste document";
        }
    }

    class Menu
    {
        public IEnumerable<string> Display(IList<Func<string>> commands)
        {
            return commands.Select(command =>
            {
                return "Display " + command();
            });
        }
    }

    public class CommandPattern2
    {
        public IEnumerable<string> Run(string name)
        {
            var document = new Document(name);
            var menu = new Menu();
            return menu.Display(new List<Func<string>>() { document.Copy, document.Paste });
        }
    }
}