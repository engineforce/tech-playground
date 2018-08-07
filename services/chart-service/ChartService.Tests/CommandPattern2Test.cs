using System;
using System.Linq;
using System.Collections.Generic;
using ChartService;
using Xunit;

namespace ChartService.Tests
{
    public class CommandPattern2Test
    {
        [Fact]
        public void Test1()
        {
            var expected = new List<string>() {
              "Display Document 1: Copy document",
              "Display Document 1: Paste document"
            };

            var actual = new CommandPattern2().Run("Document 1");

            Assert.Equal(expected, actual);
        }
    }
}
