document
  .getElementById("account-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submission prevented.");

    const accountName = document.getElementById("account-name").value.trim();
    const accountPassword = document
      .getElementById("account-password")
      .value.trim();

    console.log("Account Name:", accountName);
    console.log("Account Password:", accountPassword);

    // Validate form inputs
    if (!accountName || !accountPassword) {
      alert("Please fill in both the account name and password.");
      console.log("Validation failed: Missing account name or password.");
      return;
    }

    const account = {
      accountName,
      accountPassword,
    };

    console.log("Account object created:", account);

    try {
      const response = await window.api.saveAccount(account);
      console.log("Response from saveAccount:", response);

      if (response.success) {
        alert("Account added successfully!");
        document.getElementById("account-form").reset();
        console.log("Form reset after successful account addition.");
      } else {
        alert("Failed to add account: " + (response.error || "Unknown error"));
        console.log(
          "Failed to add account:",
          response.error || "Unknown error"
        );
      }
    } catch (error) {
      alert("Error saving account: " + error.message);
      console.log("Error saving account:", error.message);
    }
  });

// Add this function to handle account display
function displayAccounts(accounts) {
  const accountsList = document.getElementById("accounts-list");
  accountsList.innerHTML = "";

  accounts.forEach((account) => {
    const accountItem = document.createElement("div");
    accountItem.className = "account-item";
    accountItem.innerHTML = `
      <h3>${account.accountName}</h3>
      <button onclick="copyPassword('${account.accountPassword}')">Copy Password</button>
    `;
    accountsList.appendChild(accountItem);
  });
}

// Add this function to copy passwords
function copyPassword(password) {
  navigator.clipboard.writeText(password);
  alert("Password copied to clipboard!");
}

// Add this to load accounts when the page loads
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const accounts = await window.api.getAccounts();
    displayAccounts(accounts);
  } catch (error) {
    console.error("Error loading accounts:", error);
    alert("Failed to load accounts");
  }
});
