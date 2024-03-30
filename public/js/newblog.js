const sub = document.querySelector("#submit");
const sendNew = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#newbpt").value.trim();
  const body = document.querySelector("#newbp").value.trim();
  console.log(`newblog.js ${(title, body)}`);

  const response = await fetch("/dash/newblog", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dash");
  } else {
    alert("Failed to create blog post.");
  }
};

sub.addEventListener("click", sendNew);
