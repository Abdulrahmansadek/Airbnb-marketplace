import { Link } from "react-router-dom";
import { useFeedback } from "../Hooks/useFeedback";
import Spinner from "./Spinner";

function FeedbackItem() {
  const { feedback } = useFeedback();
  const { loading } = useFeedback();

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="container mx-auto feedbackList">
        <div className="feedbackTile">
          <h1> App Reviews</h1>
        </div>

        {feedback.length === 0 ? (
          <h1>no feedbacks yet</h1>
        ) : (
          feedback.map((rate, idx) => (
            <div className="feedbackItem" key={idx}>
              <article className="flex items-start space-x-6 p-6">
                <div className="min-w-0 relative flex-auto">
                  <Link to={"/profile"}>
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                        <span className="text-xs">{rate.name[0]}</span>
                      </div>
                      <h3 className="profileName">{rate.name}</h3>
                    </div>
                  </Link>
                  <h2 className="font-semibold text-slate-900 mt-10 truncate pr-20">
                    {rate.title}
                  </h2>
                  <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                    <div className="absolute top-0 right-0 flex items-center space-x-1">
                      <dt className="text-sky-500">
                        <span className="sr-only">Star rating</span>
                        <svg width="16" height="20" fill="currentColor">
                          <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                        </svg>
                      </dt>
                      <dd>{rate.rate}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default FeedbackItem;
