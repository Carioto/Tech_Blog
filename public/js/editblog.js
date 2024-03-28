const sub = document.querySelector("#submit");
const del = document.querySelector("#delete");

const sendEdit = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#editbpt").value.trim();
  const body = document.querySelector("#editbp").value.trim();
  const id = document.querySelector("#blogid").value;
  const response = await fetch("/dash/edit", {
    method: "PUT",
    body: JSON.stringify({
      title,body,id
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dash");
  } else {
    alert("Failed to edit post.");
  }
};

const sendDelete = async (event) => {
  event.preventDefault();
  const id = document.querySelector("#blogid").value;
  const response = await fetch(`/dash/edit/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dash");
  } else {
    alert("Failed to delete post.");
  }
};

sub.addEventListener("click", sendEdit);
del.addEventListener("click", sendDelete);
