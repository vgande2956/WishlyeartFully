'use client';

import {useEffect, useState, type CSSProperties} from 'react';
import {useRouter} from 'next/navigation';
import {Experience, MemoryStyle, Relationship, Theme} from '../lib/types';
import {demo, getExperiences, saveExperiences, uid} from '../lib/store';

const themeOptions: {id: Theme; title: string; description: string; color: string}[] = [
  {id: 'dreamy', title: 'Soft & dreamy', description: 'Blush, petals and a little sparkle', color: '#d891aa'},
  {id: 'pastel', title: 'Pastel skies', description: 'A gentle rainbow of happy colors', color: '#b8a9d4'},
  {id: 'sunset', title: 'Golden hour', description: 'Peachy warmth and glowing light', color: '#e9a985'},
  {id: 'garden', title: 'In the garden', description: 'Fresh leaves and wildflowers', color: '#92ad91'},
  {id: 'ocean', title: 'Ocean breeze', description: 'Calm blue with a sea-glass glow', color: '#82b9c0'},
  {id: 'royal', title: 'A little royal', description: 'Elegant, rich and celebratory', color: '#aa8eb9'},
  {id: 'midnight', title: 'Starlit night', description: 'A quiet wish beneath the stars', color: '#8277a5'},
  {id: 'minimal', title: 'Simply lovely', description: 'Clean, calm and heartfelt', color: '#b8aa9e'},
  {id: 'cosmic', title: 'Moon & magic', description: 'A dreamy little universe', color: '#9488bf'},
  {id: 'retro', title: 'Happy nostalgia', description: 'Playful colors and old-school joy', color: '#d7a56f'},
  {id: 'luxury', title: 'Golden keepsake', description: 'Soft champagne and timeless details', color: '#c6a767'},
  {id: 'confetti', title: 'Let’s celebrate', description: 'Bright, joyful and full of surprises', color: '#e28fa1'},
];

const relationshipOptions: {label: Relationship; icon: string}[] = [
  {label: 'Partner', icon: '♡'},
  {label: 'Best Friend', icon: '✿'},
  {label: 'Mom', icon: '☀'},
  {label: 'Dad', icon: '✦'},
  {label: 'Sister', icon: '❀'},
  {label: 'Brother', icon: '☼'},
  {label: 'Child', icon: '☆'},
  {label: 'Colleague', icon: '☕'},
  {label: 'Other', icon: '♡'},
];

const musicOptions = [
  {name: 'Soft Piano', note: 'A tender, thoughtful moment', icon: '♫'},
  {name: 'Golden Hour', note: 'Warm and full of sunshine', icon: '☀'},
  {name: 'Midnight Sparkle', note: 'A little dreamy and magical', icon: '✧'},
  {name: 'Celebration', note: 'A joyful birthday favorite', icon: '♪'},
];

const memoryOptions: {id: MemoryStyle; title: string; note: string; icon: string}[] = [
  {id: 'gallery', title: 'Gallery', note: 'A clean, flowing photo story', icon: '▧'},
  {id: 'polaroid', title: 'Polaroids', note: 'Little snapshots to hold onto', icon: '▣'},
  {id: 'film', title: 'Film strip', note: 'A playful vintage keepsake', icon: '▤'},
  {id: 'scrapbook', title: 'Scrapbook', note: 'A page made with love', icon: '✂'},
];

const prompts = [
  {
    title: 'A little love',
    message: 'I hope you know how deeply loved you are—not just today, but in all the ordinary little moments in between. Happy birthday. ❤️',
  },
  {
    title: 'Make them smile',
    message: 'Happy birthday to my favorite human. You make every plan more fun, every meal more delicious, and every group chat much louder. Wouldn’t change a thing. ❤️',
  },
  {
    title: 'Remember together',
    message: 'Some of my favorite memories have you in them. Thank you for every laugh, every late-night talk, and every ordinary day you made special. Here’s to many more. ✨',
  },
];

const steps = ['Your person', 'The feeling', 'Your words', 'Memories', 'Soundtrack', 'Preview', 'Share'];

export default function CreatorWizard({step}: {step: number}) {
  const router = useRouter();
  const [experience, setExperience] = useState<Experience>(() => ({
    ...demo,
    id: uid(),
    shareId: uid(),
    name: '',
    nickname: '',
    date: '',
    age: '',
    showAge: false,
    relationship: 'Best Friend',
    theme: 'dreamy',
    greeting: 'To the person who makes ordinary days feel like stories worth keeping…',
    message: '',
    wish: '',
    closing: 'With all the good things still to come,',
    signature: '',
    music: 'Soft Piano',
    memoryStyle: 'polaroid',
    accent: '#d891aa',
    status: 'Draft',
    views: 0,
    replays: 0,
    createdAt: new Date().toISOString(),
  }));

  useEffect(() => {
    const saved = sessionStorage.getItem('wishly_draft');
    if (saved) {
      try {
        const draft = JSON.parse(saved) as Partial<Experience>;
        setExperience(current => ({...current, ...draft}));
      } catch (error) {
        console.error('Could not restore the saved birthday draft.', error);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('wishly_draft', JSON.stringify(experience));
  }, [experience]);

  const patch = (update: Partial<Experience>) => setExperience(current => ({...current, ...update}));
  const go = (next: number) => {
    const routes = ['/create/person', '/create/style', '/create/message', '/create/memories', '/create/music', '/create/preview', '/create/publish'];
    router.push(routes[next] || '/create/person');
  };
  const publish = () => {
    const experiences = getExperiences().filter(item => item.id !== experience.id);
    saveExperiences([{...experience, status: 'Published'}, ...experiences]);
    router.push('/success');
  };

  const activeTheme = themeOptions.find(theme => theme.id === experience.theme) || themeOptions[0];
  const previewStyle = {'--theme-accent': experience.accent || activeTheme.color} as CSSProperties;

  return (
    <div className="editorShell">
      <div className="topbar">
        <b className="brand">Wish<span>ly</span></b>
        <span className="muted">A little love, made by you · {step + 1} of {steps.length}</span>
        <button className="btn ghost" onClick={() => router.push('/')}>Save & exit</button>
      </div>
      <div className="progress" aria-label={`Step ${step + 1} of ${steps.length}`}>
        <div style={{width: `${((step + 1) / steps.length) * 100}%`}} />
      </div>

      <div className="editor">
        <section className="formPanel">
          <div className="eyebrow">{steps[step] || steps[0]} · just for them</div>

          {step === 0 && <>
            <h1 className="serif">Who are we celebrating?</h1>
            <p className="muted">Start with your favorite person. We’ll make the rest feel like them, too.</p>
            <div className="field">
              <label htmlFor="recipient-name">Their name</label>
              <input id="recipient-name" value={experience.name} onChange={event => patch({name: event.target.value})} placeholder="What do you call them?" />
            </div>
            <div className="field">
              <label htmlFor="recipient-nickname">A nickname, if you have one</label>
              <input id="recipient-nickname" value={experience.nickname} onChange={event => patch({nickname: event.target.value})} placeholder="Sunshine, bestie, my favorite…" />
            </div>
            <div className="grid2">
              <div className="field">
                <label htmlFor="birthday-date">Birthday</label>
                <input id="birthday-date" type="date" value={experience.date} onChange={event => patch({date: event.target.value})} />
              </div>
              <div className="field">
                <label htmlFor="recipient-age">Age (optional)</label>
                <input id="recipient-age" value={experience.age} onChange={event => patch({age: event.target.value})} placeholder="A number or skip it" />
              </div>
            </div>
            <label className="toggleRow">
              <input type="checkbox" checked={experience.showAge} onChange={event => patch({showAge: event.target.checked})} />
              Include their age in the celebration
            </label>
            <div className="field">
              <label>Who are they to you?</label>
              <div className="choiceGrid">
                {relationshipOptions.map(option => (
                  <button type="button" key={option.label} aria-pressed={experience.relationship === option.label}
                    className={`choice relationship-choice ${experience.relationship === option.label ? 'active' : ''}`}
                    onClick={() => patch({relationship: option.label})}>
                    <span aria-hidden="true">{option.icon}</span>{option.label}
                  </button>
                ))}
              </div>
            </div>
          </>}

          {step === 1 && <>
            <h1 className="serif">Choose the feeling.</h1>
            <p className="muted">Pick a little world that feels like them. You can change the colors to make it yours.</p>
            <div className="choiceGrid">
              {themeOptions.map(theme => (
                <button type="button" key={theme.id} aria-pressed={experience.theme === theme.id}
                  className={`choice themeChoice ${experience.theme === theme.id ? 'active' : ''}`}
                  style={{'--swatch': theme.color} as CSSProperties}
                  onClick={() => patch({theme: theme.id, accent: theme.color})}>
                  <b>{theme.title}</b>
                  <div className="muted">{theme.description}</div>
                </button>
              ))}
            </div>
            <div className="field">
              <label htmlFor="accent-color">Make it their color</label>
              <input id="accent-color" type="color" value={experience.accent || activeTheme.color} onChange={event => patch({accent: event.target.value})} />
            </div>
          </>}

          {step === 2 && <>
            <h1 className="serif">What do you wish for them?</h1>
            <p className="muted">A few words only you could say can become the part they remember most.</p>
            <div className="field">
              <label htmlFor="opening-line">Your opening line</label>
              <input id="opening-line" value={experience.greeting} onChange={event => patch({greeting: event.target.value})} placeholder="To my favorite person…" />
            </div>
            <div className="field">
              <label htmlFor="birthday-message">The note you want them to keep</label>
              <textarea id="birthday-message" maxLength={600} value={experience.message} onChange={event => patch({message: event.target.value})} placeholder="Tell them what you love, what you remember, and what you hope they know…" />
              <small className="muted">{experience.message.length} / 600</small>
            </div>
            <p className="muted">Need a little inspiration? Start with one and make it yours.</p>
            <div className="choiceGrid">
              {prompts.map(prompt => (
                <button type="button" key={prompt.title} className="choice" onClick={() => patch({message: prompt.message})}>
                  <b>{prompt.title}</b>
                  <div className="muted">Use as a starting point</div>
                </button>
              ))}
            </div>
            <div className="field">
              <label htmlFor="birthday-wish">Your wish for their year ahead</label>
              <textarea id="birthday-wish" maxLength={240} value={experience.wish || ''} onChange={event => patch({wish: event.target.value})} placeholder="I hope this year brings you…" />
              <small className="muted">{(experience.wish || '').length} / 240</small>
            </div>
            <div className="grid2">
              <div className="field">
                <label htmlFor="letter-closing">A little sign-off</label>
                <input id="letter-closing" value={experience.closing} onChange={event => patch({closing: event.target.value})} placeholder="All my love," />
              </div>
              <div className="field">
                <label htmlFor="letter-signature">Sign your name</label>
                <input id="letter-signature" value={experience.signature} onChange={event => patch({signature: event.target.value})} placeholder="Your favorite human" />
              </div>
            </div>
          </>}

          {step === 3 && <>
            <h1 className="serif">Gather your little memories.</h1>
            <p className="muted">These demo photos show how their memory moment will feel. Choose a keepsake style below.</p>
            <div className="memoryPreview">
              {experience.photos.map((photo, index) => (
                <div className="memoryThumb" key={photo}><img src={photo} alt={`Birthday memory preview ${index + 1}`} /></div>
              ))}
            </div>
            <div className="field">
              <label>How should your memories feel?</label>
              <div className="option-cards">
                {memoryOptions.map(option => (
                  <button type="button" key={option.id} aria-pressed={experience.memoryStyle === option.id}
                    className={`choice ${experience.memoryStyle === option.id ? 'active' : ''}`}
                    onClick={() => patch({memoryStyle: option.id})}>
                    <b>{option.icon} &nbsp;{option.title}</b>
                    <div className="muted">{option.note}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="helper-note">Photo uploads aren’t connected in this demo yet. Your chosen style will appear in the birthday preview.</div>
          </>}

          {step === 4 && <>
            <h1 className="serif">Set a little soundtrack.</h1>
            <p className="muted">Choose the mood for their moment. The music starts after they open the surprise.</p>
            <div className="option-cards">
              {musicOptions.map(option => (
                <button type="button" key={option.name} aria-pressed={experience.music === option.name}
                  className={`choice ${experience.music === option.name ? 'active' : ''}`}
                  onClick={() => patch({music: option.name})}>
                  <b>{option.icon} &nbsp;{option.name}</b>
                  <div className="muted">{option.note}</div>
                </button>
              ))}
            </div>
            <div className="helper-note" style={{marginTop: 20}}>Music playback is a visual demo here; no track will play until audio is connected.</div>
            <div className="panel" style={{marginTop: 15, padding: 20}}>
              <b>Made with care</b>
              <p className="muted">Their experience opens from a private link, with no account needed.</p>
            </div>
          </>}

          {step === 5 && <>
            <h1 className="serif">Take a look before you send it.</h1>
            <p className="muted">Here’s the little story waiting for them, from the first hello to your wish for the year ahead.</p>
            <div className="sequenceList">
              {experience.scenes.map((scene, index) => (
                <div className="sequenceItem" key={scene}><span className="sequenceNumber">{index + 1}</span>{scene}</div>
              ))}
            </div>
            <div className="helper-note" style={{marginTop: 20}}>Your note and personal wish are revealed after the candles and cake. The final wish is a moment just for them.</div>
          </>}

          {step === 6 && <>
            <h1 className="serif">Ready to make them feel loved?</h1>
            <p className="muted">Your birthday surprise is ready. Publish the free demo now, or continue to the premium demo checkout.</p>
            <div className="pricing">
              <div className="price">
                <span className="eyebrow">A lovely start</span>
                <h2>Free</h2>
                <p className="muted">A personal birthday story with the core moments.</p>
                <ul><li>♡ Private share link</li><li>♡ Your message & wish</li><li>♡ Birthday interactions</li></ul>
                <button className="btn ghost" onClick={publish}>Publish my birthday wish</button>
              </div>
              <div className="price premium">
                <span className="eyebrow">A keepsake to treasure</span>
                <h2>₹199</h2>
                <p className="muted">More ways to make their day feel one of a kind.</p>
                <ul><li>♡ All twelve themes</li><li>♡ Music & memory styles</li><li>♡ QR code keepsake</li></ul>
                <button className="btn primary" onClick={() => router.push('/checkout')}>Continue to checkout</button>
              </div>
            </div>
          </>}

          {step < 6 && (
            <div className="editorFooter">
              <button className="btn ghost" onClick={() => step > 0 ? go(step - 1) : router.push('/')}>Back</button>
              <button className="btn primary" onClick={() => go(step + 1)}>{step === 5 ? 'Looks lovely · continue' : 'Next step'}</button>
            </div>
          )}
        </section>

        <aside className="previewPanel" style={previewStyle}>
          <div className="stage">
            <div className="stageInner">
              <div className="eyebrow">{activeTheme.title} · a little preview</div>
              <h1>{experience.name || 'Someone very special'}</h1>
              <div className="cake" aria-hidden="true">🎂</div>
              <p>{experience.greeting || 'A birthday wish made with love.'}</p>
              {experience.message && <div className="helper-note">{experience.message}</div>}
              {step === 3 && (
                <div className={`memories style-${experience.memoryStyle || 'gallery'}`}>
                  {experience.photos.slice(0, 2).map((photo, index) => (
                    <div className="memory" key={photo}>
                      <img src={photo} alt={`Memory style preview ${index + 1}`} />
                      <span>{memoryOptions.find(option => option.id === experience.memoryStyle)?.title || 'A memory'}</span>
                    </div>
                  ))}
                </div>
              )}
              {experience.wish && <div className="wishCard"><div className="wishMark" aria-hidden="true">♡</div><p>{experience.wish}</p></div>}
              <span className="btn primary" aria-hidden="true" style={{background: 'var(--theme-accent)', marginTop: 18}}>Made with love ♡</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
