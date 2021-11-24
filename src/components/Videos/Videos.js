// import  from "./";
// import  from "./";
import { useState } from "react";

import Video from "./Video"; // component
import LoadingStateVIdeo from "./Video"; // component
import { Link } from "react-router-dom";
import useVideoList from "../../hooks/useVideoList";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component"; // InfiniteScroll dia component ta ke wrap kore dite hobe

export default function Videos() {
    // arekta state maintain kora lagbe .. page ta ke maintain korar jonno ..
    const [page, setPage] = useState(1); // page 1 theke shuru hobe .. // 🔢📢
    const { loading, error, videos, hasMore } = useVideoList(page); //🔢📢 page er value 0 pathailam.. 0 theke shuru hobe

    const demoVideo = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const mohammad = [];
    return (
        <>
            {/* className={styles.} /}
            {/ className={styles.} */}
            <div>
                {videos.length > 0 && (
                    <InfiniteScroll
                        dataLength={videos.length}
                        next={() => {
                            setPage(page + 8); // page update korlam .. 🔢📢
                        }}
                        hasMore={hasMore}
                        loader={
                            <Spinner
                                animation="border"
                                variant="primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </Spinner>
                        }
                    >
                        {videos.map((video) =>
                            // number of question 0 theke beshi na hole to link clickable hoye to lav nai
                            video.noq > 0 ? (
                                <Link
                                    to={`/quiz/${video.youtubeID}`}
                                    key={video.youtubeID}
                                >
                                    {/* link korar shomoy o id ta pass kore dilam .. eta app.js e path="/quiz/:id" evabe receive hobe */}
                                    {/* video er ekta unique key value dite hoy  */}
                                    <Video
                                        title={video.title}
                                        id={video.youtubeID}
                                        noq={video.noq}
                                    />
                                </Link>
                            ) : (
                                <Video
                                    title={video.title}
                                    id={video.youtubeID}
                                    noq={video.noq}
                                    key={video.youtubeID}
                                />
                            )
                        )}
                    </InfiniteScroll>
                )}
                {!loading && videos.length === 0 && <div>No Data Found !</div>}
                {error && (
                    <div>
                        There was an error in VideoList hook / Check your
                        internet connection in development mood
                    </div>
                )}
                {loading && (
                    <div>
                        {/* <Spinner
                            animation="border"
                            variant="primary"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> */}

                        {
                            <InfiniteScroll dataLength={demoVideo.length}>
                                {demoVideo.map(() => (
                                    <LoadingStateVIdeo />
                                ))}
                            </InfiniteScroll>
                        }
                    </div>
                )}
            </div>
        </>
    );
}
