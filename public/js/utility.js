function verifyDevice(ip, callback) {
  web3.eth.getCoinbase(function(err, account) {
    const invocation = new XMLHttpRequest();
    invocation.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
          }
        };
        xhttp.open("POST", "verifyDevice", true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        console.log("VerifyDevice","SEND","MAC ->",this.responseText,"account ->",account)
        xhttp.send("mac=" + this.responseText + "&account=" + account);
      }
    };
    invocation.open("GET", "http://" + ip + ":3000", true);
    invocation.send();
  });
}

function registerDevice(addrs, ip) {
  web3.eth.getCoinbase(function(err, account) {
    const invocation = new XMLHttpRequest();
    invocation.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log("Transaction:", this.responseText);
          }
        };
        xhttp.open("POST", "registerDevice", true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        console.log("registerDevice","SEND","ADDRESS",addrs,"MAC ->",this.responseText,"account ->",account)
        xhttp.send(
          "addrs=" + addrs + "&mac=" + this.responseText + "&account=" + account
        );
      }
    };
    invocation.open("GET", "http://" + ip + ":3000", true);
    invocation.send();
  });
}

function removeDevice(addrs, ip) {
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
        xhttp.open("POST", "removeDevice", true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhttp.send(
          "addrs=" + addrs + "&mac=" + this.responseText + "&account=" + account
        );
      }
    };
    invocation.open("GET", "http://" + ip + ":3000", true);
    invocation.send();
  });
}

function loadPage() {
  web3.eth.getCoinbase(function(err, account) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.response == "true")
          $("#accountType").text("ADMIN - " + account);
        else $("#accountType").text("USER - " + account);
        const owner = this.responseText;
        const socket = io();
        socket.on("disconnect", () => {
          $("#deviceslist").empty();
        });
        socket.on("devices", function(msg) {
          const devices = JSON.parse(msg);
          let page = owner == "true" ? "signDevice.html" : "sshShell.html";
          console.log(page, owner == "true");
          $("#deviceslist").append(
            $("<li>").append(
              `
              <a onClick='$("#appContent").load("${page}");ipClick="${
                devices.addresses[0]
              }"' class=" waves-effect waves-block">
                <i class="material-icons">dvr</i>
                  <span>${devices.addresses[0]}</span>
              </a>
          `
            )
          );
        });
      }
    };
    xhttp.open("POST", "isOwner", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("account=" + account);
  });
}
