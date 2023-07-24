const postContainer = document.querySelector("#postContainer");
const form = document.querySelector("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const text = document.querySelector("#text").value;
  axios
    .post("http://localhost:3000/api/v1/post", {
      title: title,
      text: text,
    })
    .then(function (response) {
      form.reset();
      alert(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

window.addEventListener("load", () => {
  axios
    .get("http://localhost:3000/api/v1/posts")
    .then(function (response) {
      // handle success
      const data = response.data;
      data.forEach((ele) => {
        const post = document.createElement("div");
        post.classList.add("post");
        const title = document.createElement("div");
        title.classList.add("title");
        title.innerText = ele.title;
        const text = document.createElement("div");
        text.classList.add("text");
        text.innerText = ele.text;
        const btnDiv = document.createElement("div");
        btnDiv.classList.add("btnDiv");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button");
        deleteButton.innerText = "Delete";
        const editButton = document.createElement("button");
        editButton.classList.add("button");
        editButton.innerText = "Edit";
        btnDiv.appendChild(deleteButton);
        btnDiv.appendChild(editButton);
        post.appendChild(title);
        post.appendChild(text);
        post.appendChild(btnDiv);
        postContainer.appendChild(post);
        deleteButton.addEventListener("click", () => deletePostFunc(ele.id));
        editButton.addEventListener("click", () =>
          editPostFunc(ele.id, ele.title, ele.text)
        );
        console.log(ele);
      });
      //   console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

const deletePostFunc = (id) => {
  axios
    .delete(`http://localhost:3000/api/v1/post/${id}`)
    .then(function (response) {
      alert(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const editPostFunc = (id, title, text) => {
  const editFormDiv = document.querySelector("#editFormDiv");
  editFormDiv.style.display = "block";
  const editForm = document.querySelector("#editForm");
  const editFormTitle = document.querySelector("#editFormTitle");
  const editFormText = document.querySelector("#editFormText");
  editFormTitle.value = title;
  editFormText.value = text;
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/v1/post/${id}`, {
        title: editFormTitle.value,
        text: editFormText.value,
      })
      .then(function (response) {
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    editForm.reset();
    editFormDiv.style.display = "none";
  });
};

const cross = document.querySelector("#cross");
cross.addEventListener("click", () => {
  const editFormDiv = document.querySelector("#editFormDiv");
  editFormDiv.style.display = "none";
});
