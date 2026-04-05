import './Marquee.css';

const items = [
    'Upload notes instantly',
    'Earn from paid access',
    'Rewarded ads — not forced',
    'JEE · NEET · CBSE',
    'No subscription needed',
    'Withdraw via UPI',
    'Real student content',
    '200K+ learners',
    'Handwritten & PDF support',
    'Creator dashboard',
];

const Dot = () => <span className="marquee__dot" aria-hidden="true" />;

const Marquee = () => (
    <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
            {[...items, ...items].map((item, i) => (
                <span key={i} className="marquee__item">
                    {item}
                    <Dot />
                </span>
            ))}
        </div>
    </div>
);

export default Marquee;
