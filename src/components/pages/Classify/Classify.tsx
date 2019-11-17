import React, { StatelessComponent, useState, useRef } from 'react';
import { RouteComponentProps } from '@reach/router';
import { getDate } from '../../../utils/date';
import Tweet from '../../modules/Tweet/Tweet';
import Button from '../../elements/Button/Button';
import { Tweet as TweetType } from '../../App/App';
import styles from './Classify.module.scss';

interface IClassifyProps extends RouteComponentProps {
  tweets: TweetType[] | null;
  currentTweet: number;
  setCurrentTweet: () => void;
}

const Classify: StatelessComponent<IClassifyProps> = ({
  tweets,
  currentTweet,
  setCurrentTweet,
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  console.log("(RE-)LOADING 'CLASSIFY' COMPONENT")

  //if(tweets && currentTweet < tweets.length){
  //  const tweet = tweets[currentTweet]; // consider declaring this higher up the component tree and passing it in!
  //}

  const classifyTweet = (tweet:TweetType, outrage:boolean) => {
    const username = "user123"; // TODO: capture at beginning of classification flow when all tweets are first loaded, then pass in as props / state
    console.log("CLASSIFYING TWEET:", username, outrage, tweet);

    console.log("TODO: POST REQUEST TO BIG QUERY")


  };

  const handleOutrageClick = () => {
    if(tweets && currentTweet < tweets.length){
      console.log("CLASSIFIED AS OUTRAGEOUS");
      const tweet = tweets[currentTweet]; // consider declaring this higher up the component tree and passing it in!
      classifyTweet(tweet, true);
      refreshTweet();
    }; // todo: refactor by passing tweet in as props / state
  };

  const handleNonOutrageClick = () => {
    if(tweets && currentTweet < tweets.length){
      console.log("CLASSIFIED AS NON-OUTRAGEOUS");
      const tweet = tweets[currentTweet]; // consider declaring this higher up the component tree and passing it in!
      classifyTweet(tweet, false);
      refreshTweet();
    }; // todo: refactor by passing tweet in as props / state
  };

  const refreshTweet = () => {
    if (sectionRef.current) {
      sectionRef.current.focus();
    }
    setCurrentTweet();
    setHasImageError(false);
  };

  const handleImageError = () => {
    setHasImageError(true);
  };

  return (
    <section className={styles.section} ref={sectionRef} tabIndex={-1}>
      <h2>Help AI learn how to detect outrage</h2>
      <h3>Is the following social media message expressing moral outrage?</h3>

      {tweets && currentTweet < tweets.length ? (
        <>
          <Tweet
            tweet={tweets[currentTweet]}
            date={getDate()}
            handleImageError={handleImageError}
          />
          <div className={styles.buttons}>
            {hasImageError ? (
              <p className={styles.error}>
                This tweet does not appear to have loaded properly, please skip
                it.
                <Button text="Skip tweet" onClick={refreshTweet} />
              </p>
            ) : (
              <>
                <Button text="😒 Not outrageous" onClick={handleNonOutrageClick} />
                <Button text="😾 Outrageous! 😡" onClick={handleOutrageClick} />
              </>
            )}
          </div>
        </>
      ) : (
        <p>load more tweets</p>
      )}

    </section>
  );
};

export default Classify;
