const sub = document.querySelector('#submit');

const addComment = async (event) => {
  event.preventDefault();

  const comBody = document.querySelector('#comment').value.trim();
  const blog_id = document.querySelector('#blogid').value;
  const response = await fetch('/comm', {
    method: 'POST',
    body: JSON.stringify({
      comBody,
      blog_id,
    }),
    headers: { 'content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dash');
  } else {
    alert('Failed to add comment.');
  }
};

sub.addEventListener('click', addComment);
