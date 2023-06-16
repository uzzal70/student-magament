import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../components/Context/GloablContext";
import Post from "../../components/Post/Post";
import WriteNewPost from "../../components/WriteNewPost/WriteNewPost";
import "./dashboard.css";

const Dashboard = () => {
  const { openNav, breakpoint } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const savedData = localStorage.getItem("user-info");
  let login = JSON.parse(savedData);


  const [showWritePostBox, setShowWritePostBox] = useState(false);
  // const [posts, setPosts] = useState([
  //   {
  //     id: 0,
  //     content:
  //       "whenever i feel sad, it pretty much always turns out that i’m either hungry, dehydrated, sleep-deprived, or having a deep existential crisis!",
  //     author: {
  //       name: "Akshat Mittal",
  //       email: "akshatmittal2506@gmail.com",
  //       username: "akshatmittal61",
  //       avatar: "https://avatars.githubusercontent.com/u/84612609?v=4",
  //     },
  //     likes: {
  //       status: true,
  //       count: 4,
  //     },
  //     comments: [
  //       {
  //         id: "656asdc6a",
  //         content: "It was a good one",
  //         author: {
  //           name: "Akshat Mittal",
  //           email: "akshatmittal2506@gmail.com",
  //           username: "akshatmittal61",
  //           avatar: "https://avatars.githubusercontent.com/u/84612609?v=4",
  //         },
  //         time: "Fri Apr 15 2022 16:35:00 GMT+0530 (India Standard Time)",
  //         likes: {
  //           status: false,
  //           count: 1,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     id: 1,
  //     content:
  //       "whenever i feel sad, it pretty much always tuhenever i feel sad, it pretty much always tuhenever i feel sad, it pretty much always turns out that i’m either hungry, dehydrated, sleep-deprived, or having a deep existential crisis!",
  //     author: {
  //       name: "Akshat Khosya",
  //       email: "akshatdps12@gmail.com",
  //       username: "akshat-khosya",
  //       avatar: "https://avatars.githubusercontent.com/u/76739180?v=4",
  //     },
  //     likes: {
  //       status: false,
  //       count: 3,
  //     },
  //     comments: [
  //       {
  //         id: "656asdc6a",
  //         content:
  //           "dkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aacdkvjbdvbflab aca aac",
  //         author: {
  //           name: "Akshat Mittal",
  //           email: "akshatmittal2506@gmail.com",
  //           username: "akshatmittal61",
  //           avatar: "https://avatars.githubusercontent.com/u/84612609?v=4",
  //         },
  //         time: "Fri Apr 15 2022 16:35:00 GMT+0530 (India Standard Time)",
  //         likes: {
  //           status: false,
  //           count: 1,
  //         },
  //       },
  //       {
  //         id: "656assdvc6a",
  //         content: "It was a good one",
  //         author: {
  //           name: "Shub",
  //           email: "shubhamagarwal@gmail.com",
  //           username: "am-shubhagarwal",
  //           avatar: "",
  //         },
  //         time: "Fri Apr 15 2022 16:35:00 GMT+0530 (India Standard Time)",
  //         likes: {
  //           status: true,
  //           count: 6,
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     content:
  //       "whenever i feel sad, it pretty much always turns out that i’m either hungry, dehydrated, sleep-deprived, or having a deep existential crisis!",
  //     author: {
  //       name: "Saurabh",
  //       email: "saurabh@gmail.com",
  //       username: "saurabh",
  //       avatar: "https://avatars.githubusercontent.com/u/84612609?v=4",
  //     },
  //     likes: {
  //       status: false,
  //       count: 3,
  //     },
  //     comments: [
  //       {
  //         id: "656asdc6a",
  //         content: "It was a good one",
  //         author: {
  //           name: "Akshat Mittal",
  //           email: "akshatmittal2506@gmail.com",
  //           username: "akshatmittal61",
  //           avatar: "https://avatars.githubusercontent.com/u/84612609?v=4",
  //         },
  //         time: "Fri Apr 15 2022 16:35:00 GMT+0530 (India Standard Time)",
  //         likes: {
  //           status: false,
  //           count: 1,
  //         },
  //       },
  //     ],
  //   },
  // ]);
  // const likePost = (id) => {
  //   let newPosts = [];
  //   posts.forEach((post) => {
  //     if (post.id === id)
  //       newPosts = [
  //         ...newPosts,
  //         {
  //           ...post,
  //           likes: {
  //             status: !post.likes.status,
  //             count: post.likes.status
  //               ? post.likes.count - 1
  //               : post.likes.count + 1,
  //           },
  //         },
  //       ];
  //     else newPosts = [...newPosts, post];
  //   });
  //   setPosts(newPosts);
  // };
  const [refetch, setRefetch] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("https://alumni-portal-production.up.railway.app/alumni/allmessage")
      .then((res) => res.json())
      .then((data) => {
        setData(data.reverse());
        setIsloading(true)
      });
  }, [refetch]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, Name:login?.Name });
  };
console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://alumni-portal-production.up.railway.app/alumni/postmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      const data = await response.json();
      setRefetch(!refetch)
      setFormData({})
    } catch (error) {
      console.log('Error:', error.message);
    }
    e.target.reset();
  };

 
  return (
    <section className="dashboard-container">
      <div className="dashboard-head">
        <div className="dashboard-write">
          {/* <div className="dashboard-write-avatar">
            <img src={user.avatar} alt={user.name} />
          </div> */}
          <div
            className="dashboard-write-block"
            onClick={() => setShowWritePostBox(true)}
          >
            <span>Add a new post...</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
  <div className="post-form">
    <input
      className="input-1"
      type="text"
      name="Title"
      placeholder="Title"
      value={formData.Title}
      onChange={handleChange}
    />
    <input
      className="input-2"
      type="text"
      name="Body"
      placeholder="Description"
      value={formData.Body}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </div>
</form>
{!isLoading?"Loading...":<>{data.length !== 0 ? (
  <>
    {data.map((data, index) => (
      <div
        key={index}
        style={{
          background: 'var(--back-shadow-light)',
          padding: '10px 20px',
          width: '100%',
          marginBottom: '10px',
          borderRadius: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p>
              <strong>Title:</strong> {data?.Title}
            </p>
            <p>
              <strong>Description:</strong> {data?.Body}
            </p>
          </div>
          <p>
            <strong>Name:</strong> {data?.Name}
          </p>
        </div>
      </div>
    ))}
  </>
) : (
  'No data'
)}</>}

    
      <div className="dashboard-body">
        <div className="dashboard-posts">
          <div
            className={`responsive-masonry responsive-masonry-layout-${
              breakpoint("mobile")
                ? "1"
                : breakpoint("tab")
                ? openNav
                  ? "1"
                  : "2"
                : openNav
                ? "2"
                : "3"
            }`}
          >
            {/* {data.map((post, index) => (
              <div className={`responsive-masonry-box`} key={index}>
                <Post
                  //   addComment={submitComment}
                  //   post={post}
                  //   likePost={likePost}
                  data={post}
                />
              </div>
            ))} */}
          </div>
        </div>
      </div>
      {/* {showWritePostBox && (
        <WriteNewPost close={() => setShowWritePostBox(false)} />
      )} */}
    </section>
  );
};

export default Dashboard;
