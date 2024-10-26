const id = document.getElementById("storeId");
const storeAddress = document.getElementById("address");
const submit = document.getElementById("submit");
const storeForm = document.getElementById("storeForm");

let addStore = async (e) => {
  e.preventDefault();
  if (storeAddress.value == "" || id.value == "") {
    alert("Please add the address and stored id");
    return;
  }
  const sendData = {
    storeId: id.value,
    address: storeAddress.value,
  };

  // Wrapping i try catch
  try {
    const response = await fetch("/api/geo/store", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    if (response.status == 400) {
      throw new Error("Error User with this id already exist");
    }
    alert("Store Added successfully");
    window.location.href = "./index.html";
    address.value = "";
    id.value = "";
  } catch (error) {
    alert(error);
    return;
  }
};

storeForm.addEventListener("submit", addStore);
