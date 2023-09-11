import { useCallback, useEffect, useRef, ReactNode } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiChevronsRight } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import {
  CrewPersonMax,
  CrewPostButton,
  CrewPostInfo,
  CrewPostRecent,
  CrewPostReContent,
  CrewPostReImg,
  CrewPosts,
  CrewPostsRecents,
  CrewPostUpLoad,
} from "./MyCrews.style";
import { debounce } from "lodash";

interface Crew {
  crewRecruitmentId: number;
  title: string;
  exerciseKind: string;
  location: string;
  totalNumber: number;
  image: string[];
  currentNumber: number;
}

interface CrewDataResponse {
  data: {
    crewList: Crew[];
  };
  last: boolean;
}

const MyCrews: React.FC = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const access = localStorage.getItem("Access");
  const refresh = localStorage.getItem("Refresh");
  const { data, isSuccess, hasNextPage, fetchNextPage,refetch } =
    useInfiniteQuery<CrewDataResponse>(
      ["crewData"],
      ({ pageParam = 1 }) =>
        axios.get(`${process.env.REACT_APP_SERVER_URL}/crew/more`, {
          params: {
            page: pageParam,
            size: 2,
            sortBy: "createPostDate",
            isAsc: false,
          },
          headers: {
            Access: `${access}`,
            Refresh: `${refresh}`,
          },
        }),
      {
        getNextPageParam: (lastPage, totalPage) => {
          return totalPage[totalPage.length - 1].last
            ? undefined
            : totalPage.length + 2;
        },
      }
    );
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  const debouncedHandleObserver = debounce(handleObserver, 300);
  useEffect(() => {
    const element = observerRef.current;
    if (!element) {
      return;
    }

    const option: IntersectionObserverInit = { threshold: 0 };
    const observer = new IntersectionObserver(debouncedHandleObserver, option);
    observer.observe(element);

    const interval = setInterval(() => {
      refetch(); 
    }, 2000);

    return () => {
      observer.unobserve(element);
      clearInterval(interval);
    };
  }, [fetchNextPage, hasNextPage, debouncedHandleObserver, refetch]);

  const addressSubstraction = (location: string) => {
    const parts = location.split(" ");
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1]}`;
    }
    return "";
  };

  const navigate = useNavigate();

  const navigationOne = () => {
    navigate("/crew/write");
  };

  if (isSuccess && !data) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>Error...</div>;
  }

  const navigateDetail = (id: number) => {
    navigate(`/crew/${id}`);
  };

  const flattenedCrewList = data?.pages.flatMap((page) => page.data.crewList);
  // console.log(flattenedCrewList)
  return (
    <CrewPosts>
      <CrewPostUpLoad>
        <h3>크루 모집 포스팅</h3>
        <div className="crewPostButton" onClick={navigationOne}>
          <p>크루를 모집 해보세요</p>
          <button onClick={navigationOne}>
            <FiChevronsRight />
          </button>
        </div>

        <CrewPostsRecents>
          {isSuccess &&
            flattenedCrewList.map((crew) => (
              <CrewPostRecent
                key={crew.crewRecruitmentId}
                onClick={() => navigateDetail(crew.crewRecruitmentId)}
              >
                <CrewPostReImg>
                  <img
                    src={
                      crew.image?.length !== 0 &&
                      crew.image?.length !== undefined
                        ? crew.image[0]
                        : ""
                    }
                    alt=""
                  />
                </CrewPostReImg>
                <CrewPostReContent>
                  <div className="crewPostTitle">
                    <p>{crew.title}</p>
                  </div>
                  <CrewPostInfo>
                    <div className="category">{crew.exerciseKind}</div>
                    <div>/</div>
                    <div className="location">
                      {addressSubstraction(crew.location)}
                    </div>
                  </CrewPostInfo>
                  <CrewPersonMax>
                    <div className="crewPerson">
                      <BsFillPersonFill />
                      <div className="maxPeople">
                        <p>{crew.currentNumber}</p>
                        <p>/</p>
                        <p>{crew.totalNumber}</p>
                      </div>
                    </div>
                  </CrewPersonMax>
                </CrewPostReContent>
              </CrewPostRecent>
            ))}
        </CrewPostsRecents>

        <CrewPostButton onClick={() => fetchNextPage()}>
          <p>more</p>
          <IoIosArrowDown />
        </CrewPostButton>
      </CrewPostUpLoad>
    </CrewPosts>
  );
};

export default MyCrews;
