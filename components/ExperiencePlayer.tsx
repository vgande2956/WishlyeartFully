'use client';

import {useEffect, useMemo, useRef, useState, type CSSProperties} from 'react';
import {Experience} from '../lib/types';

export default function ExperiencePlayer({exp}: {exp: Experience}) {
  const [scene, setScene] = useState(0);
  const [popped, setPopped] = useState<number[]>([]);
  const [wished, setWished] = useState(false);
  const [cut, setCut] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [letterOpening, setLetterOpening] = useState(false);
  const [threadPulled, setThreadPulled] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [toast, setToast] = useState('');
  const letterTimer = useRef<number | undefined>(undefined);
  const balloons = useMemo(() => [0, 1, 2, 3, 4], []);
  const accentStyle = {'--theme-accent': exp.accent || '#d891aa'} as CSSProperties;
  const letterMessage = exp.message || 'I’m so lucky to have you in my life. I hope you feel celebrated today, and every day after.';
  const letterSignature = exp.signature || 'Someone who loves you';
  const typedLetter = [exp.greeting, letterMessage, exp.closing, letterSignature].join('\n\n');
  const greetingEnd = exp.greeting.length;
  const messageEnd = greetingEnd + 2 + letterMessage.length;
  const closingEnd = messageEnd + 2 + exp.closing.length;
  const letterEnd = typedLetter.length;

  useEffect(() => () => window.clearTimeout(letterTimer.current), []);

  useEffect(() => {
    if (!letterOpen) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedCount(letterEnd);
      return;
    }

    const typingTimer = window.setInterval(() => {
      setTypedCount(current => {
        if (current + 1 >= letterEnd) {
          window.clearInterval(typingTimer);
          return letterEnd;
        }
        return current + 1;
      });
    }, 22);
    return () => window.clearInterval(typingTimer);
  }, [letterOpen, letterEnd]);
  const birthdayDate = exp.date
    ? new Intl.DateTimeFormat('en', {month: 'long', day: 'numeric'}).format(new Date(`${exp.date}T12:00:00`))
    : '';

  const show = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };
  const next = () => setScene(current => Math.min(7, current + 1));
  const makeWish = () => {
    setWished(true);
    show('Your candle is out. Your wish is on its way ✨');
    window.setTimeout(next, 1500);
  };
  const openLetter = () => {
    if (letterOpening || letterOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLetterOpen(true);
      setTypedCount(letterEnd);
      return;
    }
    setLetterOpening(true);
    letterTimer.current = window.setTimeout(() => {
      setLetterOpen(true);
      setTypedCount(0);
    }, 1050);
  };
  const replay = () => {
    setScene(0);
    setPopped([]);
    setWished(false);
    setCut(false);
    setLetterOpening(false);
    setThreadPulled(false);
    setLetterOpen(false);
    setTypedCount(0);
  };
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({title: `A birthday wish for ${exp.name}`, url});
      return;
    }
    if (!navigator.clipboard) {
      show('Copy this page link to share the birthday love.');
      return;
    }
    await navigator.clipboard.writeText(url);
    show('The birthday link is ready to share ♡');
  };

  return (
    <main className="recipient">
      <section className="stage" style={accentStyle}>
        <div className="stageInner">
          {scene === 0 && <>
            <div className="eyebrow">A little birthday surprise for {exp.name || 'someone wonderful'} ♡</div>
            <h1>Someone made this just for you.</h1>
            <p>Get comfy. Take a little breath. There’s a birthday moment waiting, made with so much love.</p>
            {birthdayDate && <p className="muted">Celebrating you on {birthdayDate}</p>}
            <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={() => {setScene(1); show('Your celebration is ready ♡');}}>
              Open your birthday surprise
            </button>
          </>}

          {scene === 1 && <>
            <div className="eyebrow">A tiny party, just for you</div>
            <h1>Pop a little happiness.</h1>
            <p>Tap each balloon to fill the room with birthday wishes.</p>
            <div className="balloons">
              {balloons.map(index => (
                <button type="button" aria-label={`Pop balloon ${index + 1}`} key={index}
                  className={`balloon ${popped.includes(index) ? 'popped' : ''}`}
                  onClick={() => {
                    const nextPopped = popped.includes(index) ? popped : [...popped, index];
                    setPopped(nextPopped);
                    if (nextPopped.length === balloons.length) show('The room is full of birthday magic ✨');
                  }} />
              ))}
            </div>
            {popped.length === balloons.length && <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={next}>See what’s waiting ♡</button>}
          </>}

          {scene === 2 && <>
            <div className="eyebrow">For {exp.nickname || exp.name || 'you'}, with love</div>
            <h1>Make a wish.</h1>
            <div className={`wishCake ${wished ? 'extinguished' : ''}`} aria-hidden="true">
              <span className="candleStick"><span className="wishCandle">🔥</span>{wished && <span className="candleSmoke">♡</span>}</span>
              <span className="wishCakeEmoji">🎂</span>
            </div>
            <p>Close your eyes for a moment. Think of something lovely you’d like this next year to bring.</p>
            <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={makeWish} disabled={wished}>
              {wished ? 'Your wish is on its way ✨' : 'I’ve made my wish'}
            </button>
          </>}

          {scene === 3 && <>
            <div className="eyebrow">Birthday cake tastes better together</div>
            <h1>Save a little slice.</h1>
            <div className="cake" aria-hidden="true">{cut ? '🍰' : '🎂'}</div>
            <p>{cut ? 'The first slice is yours. Make a wish for another beautiful year.' : 'Go on—cut the first slice. Today, you deserve the biggest one.'}</p>
            <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={() => {
              if (cut) { next(); return; }
              setCut(true);
              window.setTimeout(next, 900);
            }}>{cut ? 'Open a note from the heart' : 'Cut the cake'}</button>
          </>}

          {scene === 4 && <>
            <div className="eyebrow">A note, written only for you</div>
            <h1>{letterOpen ? `Dear ${exp.nickname || exp.name || 'you'}…` : 'There’s a little letter for you.'}</h1>
            {!letterOpen ? (
              <>
                <p>There’s a little keepsake card here, tied up with love. Pull its ribbon to see what’s inside.</p>
                <div className={`loveReveal ${letterOpening ? 'is-opening' : ''}`}>
                  {['♡', '♥', '✧', '♡', '✿', '♥', '✧'].map((heart, index) => (
                    <span className={`loveFloat loveFloat-${index + 1}`} key={`${heart}-${index}`} aria-hidden="true">{heart}</span>
                  ))}
                  <div className="keepsakeCard">
                    <div className="cardBack" />
                    <div className="cardLid" />
                    <div className="cardFront">
                      <span className="cardConfetti" aria-hidden="true">✧ &nbsp; ♡ &nbsp; ✿</span>
                      <span className="cardFrontHeart" aria-hidden="true">♡</span>
                      <span className="cardFrontText">A little something<br />from my heart to yours</span>
                    </div>
                    <div className={`pullThread ${threadPulled ? 'is-pulled' : ''}`} aria-hidden="true" />
                    <button type="button" className={`pullTab ${threadPulled ? 'is-pulled' : ''}`}
                      onPointerDown={() => setThreadPulled(true)}
                      onPointerUp={() => setThreadPulled(false)}
                      onPointerCancel={() => setThreadPulled(false)}
                      onClick={openLetter} disabled={letterOpening}
                      aria-label="Pull the ribbon to open your letter">
                      <span>Pull</span><span className="pullTabHeart" aria-hidden="true">♡</span>
                    </button>
                  </div>
                </div>
                <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={openLetter} disabled={letterOpening}>
                  {letterOpening ? 'A little love is on its way…' : 'Pull the ribbon to open your letter'}
                </button>
              </>
            ) : (
              <>
                <div className={`letterPaper ${typedCount === letterEnd ? 'is-typed' : ''}`}>
                  <article className="letter" aria-label="Your birthday letter">
                    <div className="srOnly">{typedLetter}</div>
                    <p className="letterGreeting" aria-hidden="true">
                      {typedLetter.slice(0, Math.min(typedCount, greetingEnd))}
                      {typedCount <= greetingEnd && <span className="typingCaret" />}
                    </p>
                    <p aria-hidden="true">
                      {typedCount > greetingEnd + 2 && typedLetter.slice(greetingEnd + 2, Math.min(typedCount, messageEnd))}
                      {typedCount > greetingEnd && typedCount <= messageEnd && <span className="typingCaret" />}
                    </p>
                    <p className="letterSignoff" aria-hidden="true">
                      {typedCount > messageEnd + 2 && typedLetter.slice(messageEnd + 2, Math.min(typedCount, closingEnd))}
                      {typedCount > messageEnd && typedCount <= closingEnd && <span className="typingCaret" />}
                      {typedCount > closingEnd && <><br /><strong>{typedLetter.slice(closingEnd + 2, typedCount)}</strong></>}
                      {typedCount > closingEnd && typedCount < letterEnd && <span className="typingCaret" />}
                    </p>
                  </article>
                </div>
                <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={next} disabled={typedCount < letterEnd}>
                  {typedCount < letterEnd ? 'Your words are on their way…' : 'Keep this feeling close'}
                </button>
              </>
            )}
          </>}

          {scene === 5 && <>
            <div className="eyebrow">A few favorite moments</div>
            <h1>Look how much life we’ve lived.</h1>
            <p>Here’s to the little things that turned into the best memories.</p>
            <div className={`memories style-${exp.memoryStyle || 'gallery'}`}>
              {exp.photos.map((photo, index) => (
                <div className="memory" key={photo}>
                  <img src={photo} alt={`A favorite birthday memory, ${index + 1}`} />
                  <span>{['The laughs we still talk about', 'The little things that mean everything', 'All the good still to come'][index] || 'A moment worth keeping'}</span>
                </div>
              ))}
            </div>
            <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={next}>One last thing, just for you</button>
          </>}

          {scene === 6 && <>
            <div className="eyebrow">A wish for the year ahead ✨</div>
            <h1>May this year be kind to you.</h1>
            <div className="wishCard">
              <div className="wishMark" aria-hidden="true">♡</div>
              <p>{exp.wish || 'I hope this year brings you the kind of joy you give everyone around you.'}</p>
              <span className="muted">A wish from someone who cares about you</span>
            </div>
            <p>You deserve all the lovely things you’re always wishing for everyone else.</p>
            <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={next}>Keep this wish with you</button>
          </>}

          {scene === 7 && <>
            <div className="eyebrow">Happy birthday, {exp.name || 'you'} ♡</div>
            <h1>So glad the world has you.</h1>
            <p>May you carry this little reminder with you: you are loved, you are celebrated, and someone is always cheering you on.</p>
            {exp.showAge && exp.age && <p className="serif">Here’s to {exp.age} looking lovely on you.</p>}
            {exp.signature && <p className="serif">{exp.closing}<br /><strong>{exp.signature}</strong></p>}
            <div className="sceneBtns">
              <button className="btn primary" style={{background: 'var(--theme-accent)'}} onClick={replay}>Keep this feeling · replay</button>
              <button className="btn ghost" onClick={() => {void share().catch(error => {
                if (error instanceof Error && error.name !== 'AbortError') show('We couldn’t share the link just now. Please try again.');
              });}}>Share the birthday love</button>
            </div>
          </>}
        </div>
        {toast && <div className="toast" role="status">{toast}</div>}
      </section>
    </main>
  );
}
