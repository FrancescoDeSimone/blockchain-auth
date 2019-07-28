function verifyDevice(ip) {
  web3.eth.getCoinbase(function(err, account) {
    const invocation = new XMLHttpRequest();
    invocation.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
          }
        };
        xhttp.open("POST", "verifyDevice", true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        console.log("Verify MAC ADDRS: ",this.responseText);
        xhttp.send("passwd=" + this.responseText + "&account=" + account);
      }
    };
    invocation.open("GET", "http://" + ip + ":3000", true);
    invocation.send();
  });
}

function registerDevice(ip) {
  web3.eth.getCoinbase(function(err, account) {
    const invocation = new XMLHttpRequest();
    invocation.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
          }
        };
        xhttp.open("POST", "registerDevice", true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        console.log("Register MAC ADDRS: ",this.responseText);
        xhttp.send("passwd=" + this.responseText + "&account=" + account);
      }
    };
    invocation.open("GET", "http://" + ip + ":3000", true);
    invocation.send();
  });
}
