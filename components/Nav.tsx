import Link from 'next/link';
export default function Nav(){return <div className="container nav"><Link className="brand" href="/">Wish<span>ly</span></Link><div className="navlinks"><a href="#how">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a></div><Link className="btn primary" href="/create">Create experience</Link></div>}
