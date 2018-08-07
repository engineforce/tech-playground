namespace ChartService
{
    using System;


    /* The Invoker class */
    class Switch
    {
        ICommand _closedCommand;
        ICommand _openedCommand;

        public Switch(ICommand closedCommand, ICommand openedCommand)
        {
            this._closedCommand = closedCommand;
            this._openedCommand = openedCommand;
        }

        //close the circuit/power on
        public void Close()
        {
            this._closedCommand.Execute();
        }

        //open the circuit/power off
        public void Open()
        {
            this._openedCommand.Execute();
        }
    }

    /* An interface that defines actions that the receiver can perform */
    interface ISwitchable
    {
        void PowerOn();
        void PowerOff();
    }

    /* The Receiver class */
    class Light : ISwitchable
    {
        public void PowerOn()
        {
            Console.WriteLine("The light is on");
        }

        public void PowerOff()
        {
            Console.WriteLine("The light is off");
        }
    }

    interface ICommand
    {
        void Execute();
    }

    /* The Command for turning on the device - ConcreteCommand #1 */
    class CloseSwitchCommand : ICommand
    {
        private ISwitchable _switchable;

        public CloseSwitchCommand(ISwitchable switchable)
        {
            _switchable = switchable;
        }

        public void Execute()
        {
            _switchable.PowerOff();
        }
    }

    /* The Command for turning off the device - ConcreteCommand #2 */
    class OpenSwitchCommand : ICommand
    {
        private ISwitchable _switchable;

        public OpenSwitchCommand(ISwitchable switchable)
        {
            _switchable = switchable;
        }

        public void Execute()
        {
            _switchable.PowerOn();
        }
    }

    public class CommandPattern
    {
        public void Run(string command)
        {
            ISwitchable lamp = new Light();

            //Pass reference to the lamp instance to each command
            ICommand switchClose = new CloseSwitchCommand(lamp);
            ICommand switchOpen = new OpenSwitchCommand(lamp);

            //Pass reference to instances of the Command objects to the switch
            Switch @switch = new Switch(switchClose, switchOpen);

            if (command == "ON")
            {
                // Switch (the Invoker) will invoke Execute() on the command object.
                @switch.Open();
            }
            else if (command == "OFF")
            {
                //Switch (the Invoker) will invoke the Execute() on the command object.
                @switch.Close();
            }
            else
            {
                Console.WriteLine("Argument \"ON\" or \"OFF\" is required.");
            }
        }
    }
}