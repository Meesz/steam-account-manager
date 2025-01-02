export async function displayAccounts() {
  console.log("Starting displayAccounts function");
  try {
    console.log("Fetching accounts...");
    const accounts = await window.api.getAccounts();
    console.log("Accounts fetched:", accounts);

    const accountsList = document.getElementById("accounts-list");
    console.log("Got accounts-list element");
    accountsList.innerHTML = "";
    console.log("Cleared accounts list HTML");

    if (accounts.length === 0) {
      console.log("No accounts found");
      accountsList.innerHTML = "<p>No accounts saved yet.</p>";
      return;
    }

    console.log("Iterating through accounts...");
    accounts.forEach((account) => {
      console.log("Creating element for account:", account.accountName);
      const accountItem = document.createElement("div");
      accountItem.className = "account-item";
      
      const heading = document.createElement("h3");
      heading.textContent = account.accountName;
      
      const button = document.createElement("button");
      button.textContent = "Copy Password";
      button.addEventListener("click", () => {
        console.log("Copying password to clipboard");
        navigator.clipboard.writeText(account.accountPassword);
        console.log("Password copied successfully");
        alert("Password copied to clipboard!");
        console.log("Alert shown to user");
      });

      accountItem.appendChild(heading);
      accountItem.appendChild(button);
      
      console.log("Adding account item to list");
      accountsList.appendChild(accountItem);
    });
    console.log("Finished displaying all accounts");
  } catch (error) {
    console.error("Error loading accounts:", error);
    document.getElementById("accounts-list").innerHTML =
      '<p style="color: red;">Failed to load accounts. Please try again.</p>';
    console.log("Error handled and displayed to user");
  }
}

console.log("Adding DOMContentLoaded event listener");
window.addEventListener("DOMContentLoaded", displayAccounts);
console.log("Event listener added");
