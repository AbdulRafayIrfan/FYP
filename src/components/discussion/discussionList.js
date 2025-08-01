import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import DiscussionPost from "./discussionPost";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { notifications } from "@mantine/notifications";

function DiscussionList() {
  const [discussionList, setDiscussionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deletedFlag = router.query.deletedPost;

  useEffect(() => {
    getDiscussions();

    if (deletedFlag !== undefined) {
      notifications.show({
        title: "Successfully deleted the post!",
        color: "green",
        autoClose: 2000,
        icon: <CheckCircleIcon />,
        styles: {
          title: {
            color: "green",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "1rem",
          },
        },
      });
    }
  }, [deletedFlag]);

  function getDiscussions() {
    const globalDiscussions = collection(
      db,
      "discussions/global/discussionList"
    );
    setLoading(true);
    getDocs(globalDiscussions)
      .then((response) => {
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
    if (loading)
      return (
        <div className="text-center mt-2">
          <Loader color="red" size="lg" />
        </div>
      );

    return discussionList.length > 0 ? (
      discussionList.map((discussion) => (
        <DiscussionPost
          key={discussion.id}
          data={discussion.data}
          discussionId={discussion.id}
          fetchDiscussions={getDiscussions}
        />
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
