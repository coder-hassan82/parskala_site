import style from "@/app/_style/SubPageDetails.module.css";

import Description from "./Description";
import CommentsList from "./CommentsList";
import AnalysisComment from "./AnalysisComment";
import { Suspense } from "react";
import Loading from "./loading";
import { getProductComments } from "@/app/_server/data-server";
import NoComment from "./NoComment";

export default async function Page({ params }) {
  const comments = await getProductComments(params.productId);

  return (
    <div className={style.container}>
      <Description />
      <div className={style.commentContainer}>
        {comments.length > 0 ? (
          <>
            <Suspense fallback={<Loading />}>
              <CommentsList comments={comments} />
            </Suspense>
          </>
        ) : (
          <NoComment />
        )}
        <AnalysisComment comments={comments} productId={params.productId} />
      </div>
    </div>
  );
}
