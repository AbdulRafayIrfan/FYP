import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import DiscussionPost from "./discussionPost";

function DiscussionList() {
  const [discussionList, setDiscussionList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDiscussions();
  }, []);

  function getDiscussions() {
    const globalDiscussions = collection(
      db,
      "discussions/global/discussionList"
    );
    setLoading(true);
    getDocs(globalDiscussions)
      .then((response) => {
        console.log(response.docs);
        const discussions = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setDiscussionList(discussions);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  }

  function renderDiscussions() {
    if (loading) return <div>Loading...</div>;

    return discussionList.length > 0 ? (
      discussionList.map((discussion) => (
        // <div key={discussion.id}>
        //   <h1>{discussion.data.title}</h1>
        //   <p>{discussion.data.content}</p>
        // </div>
        <DiscussionPost key={discussion.id} data={discussion.data} />
      ))
    ) : (
      <div>There are currently no discussions</div>
    );
  }

  return (
    <section className="inline-block w-full">{renderDiscussions()}</section>
  );
}

export default DiscussionList;
