import Link from 'next/link';
import Nav from '../components/Nav';

const features = [
  ['♡', 'A note from you', 'Say the things that deserve more than a quick text.'],
  ['✧', 'A wish for their year', 'Give them a little hope to carry into what comes next.'],
  ['▧', 'Your favorite memories', 'Turn shared moments into a small keepsake.'],
  ['♫', 'A soundtrack they love', 'Set a soft, joyful, or dreamy mood for their surprise.'],
  ['☼', 'A candle wish', 'Give them a quiet moment to wish for something wonderful.'],
  ['✿', 'Made for your person', 'Choose colors and details that feel like them.'],
];

const steps = [
  ['01', 'Tell us about them', 'Choose your person, a color palette, and a feeling.'],
  ['02', 'Add your words', 'Write a note and a wish for their year ahead.'],
  ['03', 'Send a little love', 'Preview the birthday moment, then share their private link.'],
];

export default function Home() {
  return (
    <>
      <header><Nav /></header>
      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <div className="eyebrow">A birthday surprise, made with love ♡</div>
              <h1>Make their birthday feel like <i>being loved.</i></h1>
              <p>More than a greeting. A little celebration full of your words, your favorite memories, and a wish just for them.</p>
              <div className="actions">
                <Link className="btn primary" href="/create">Make their birthday wish</Link>
                <a className="btn ghost" href="#how">See how it works</a>
              </div>
              <p className="muted" style={{fontSize: 13}}>A thoughtful surprise for anyone you love. No account needed to open it.</p>
            </div>
            <div className="hero-art" aria-label="A birthday card made with love">
              <div className="hero-glow" />
              <span className="floating-heart one" aria-hidden="true">♡</span>
              <span className="floating-heart two" aria-hidden="true">✧</span>
              <div className="hero-note">
                <div className="eyebrow">A little note for you</div>
                <div className="hero-cake" aria-hidden="true">🎂</div>
                <h2>Make a wish.</h2>
                <p>There’s a whole lot of love in this little surprise.</p>
                <Link className="btn primary" href="/create">Open your birthday wish ♡</Link>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="section alt">
          <div className="container center">
            <div className="eyebrow">Thoughtful, not complicated</div>
            <h2>Three little steps.<br />One feeling they’ll keep.</h2>
            <p className="sub">Make something personal in a few minutes. Their surprise opens in a browser—no app or account needed.</p>
            <div className="steps">
              {steps.map(([number, title, description]) => (
                <article className="step" key={number}>
                  <span className="stepNum">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
              <article className="step">
                <span className="stepNum">♡</span>
                <h3>They feel the love</h3>
                <p>A birthday moment, a letter from you, and a wish to carry into the year ahead.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="container center">
            <div className="eyebrow">The lovely little details</div>
            <h2>Every part says, “I thought of you.”</h2>
            <p className="sub">Keep it simple or add all the details that make it feel like your kind of love.</p>
            <div className="featureGrid">
              {features.map(([icon, title, description]) => (
                <article className="feature" key={title}>
                  <div className="featureIcon" aria-hidden="true">{icon}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt">
          <div className="container center">
            <div className="eyebrow">For every kind of love</div>
            <h2>For the people who make life yours.</h2>
            <p className="sub">Your partner, your best friend, your family, your chosen family—or someone who could use a little extra love today.</p>
            <div className="relGrid">
              {[
                ['♡', 'Your person'], ['✿', 'Your best friend'], ['☀', 'Mom or Dad'], ['☆', 'Your sibling'],
                ['☁', 'Your child'], ['☕', 'Someone at work'], ['✦', 'Your chosen family'], ['♡', 'Someone special'],
              ].map(([icon, label]) => (
                <div className="relCard" key={label}><span aria-hidden="true">{icon} &nbsp;</span>{label}</div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="section">
          <div className="container center">
            <div className="eyebrow">A little something for every budget</div>
            <h2>Love doesn’t need a price tag.</h2>
            <p className="sub">Start with a thoughtful birthday wish. Add a keepsake upgrade if you’d like to make it extra special.</p>
            <div className="pricing">
              <article className="price">
                <h3>A heartfelt hello</h3>
                <h2>Free</h2>
                <p className="muted">A lovely little birthday moment to share.</p>
                <ul><li>♡ Personal birthday note</li><li>♡ A wish for their year</li><li>♡ Private share link</li></ul>
                <Link className="btn ghost" href="/create">Make a birthday wish</Link>
              </article>
              <article className="price premium">
                <h3>A keepsake to treasure</h3>
                <h2>₹199</h2>
                <p className="muted">More ways to make the surprise their own.</p>
                <ul><li>♡ All twelve color themes</li><li>♡ Music & memory styles</li><li>♡ QR code keepsake</li></ul>
                <Link className="btn primary" href="/create">Explore the extra details</Link>
              </article>
            </div>
          </div>
        </section>

        <section id="faq" className="section alt">
          <div className="container">
            <div className="center">
              <div className="eyebrow">A few reassuring answers</div>
              <h2>Good to know.</h2>
            </div>
            <div className="faq">
              {[
                ['Do they need an account?', 'No. They can open the private link in their browser and enjoy the surprise.'],
                ['Can I make something for anyone?', 'Absolutely. Make a birthday wish for your partner, friend, family, colleague, or anyone you want to celebrate.'],
                ['Can I change the colors and words?', 'Yes. Choose a theme, adjust its accent color, and write the message and wish in your own words.'],
                ['Will the music play automatically?', 'No. The recipient can choose when to begin the experience. Music playback is a visual demo until audio is connected.'],
              ].map(([question, answer]) => (
                <details key={question}>
                  <summary><b>{question}</b></summary>
                  <p className="muted">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap'}}>
          <div><b className="brand">Wish<span>ly</span></b><div style={{marginTop: 9}}>A little love, shared.</div></div>
          <div>Made for the people who make your world.</div>
          <div>© 2026 Wishly</div>
        </div>
      </footer>
    </>
  );
}
