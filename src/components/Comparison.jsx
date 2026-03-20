import { Check, X, Shield, Globe, Terminal, User } from 'lucide-react';
import './Comparison.css';

const rows = [
    { item: "Creator Revenue Share", via: "70%", others: "30-50%" },
    { item: "Rewarded Ad Support", via: true, others: false },
    { item: "Withdrawal Threshold", via: "₹100", others: "₹1,000+" },
    { item: "Content Security", via: "Watermarked & Secure", others: "Basic PDF" },
    { item: "Note Discoverability", via: "AI-Powered SEO", others: "Manual Search" },
    { item: "Withdrawal Speed", via: "Instant / Same-day", others: "7-14 Days" },
];

const Comparison = () => {
    return (
        <section className="compare" id="compare">
            <div className="container">
                <div className="compare__head">
                    <span className="label">Comparison</span>
                    <h2 className="section-title">Why creators choose Studyvia.</h2>
                </div>

                <div className="compare__table card">
                    <div className="compare__row compare__header">
                        <div className="compare__cell compare__cell--item">Feature</div>
                        <div className="compare__cell compare__cell--via">Studyvia</div>
                        <div className="compare__cell compare__cell--others">Other Platforms</div>
                    </div>

                    {rows.map((row, i) => (
                        <div key={i} className="compare__row">
                            <div className="compare__cell compare__cell--item">{row.item}</div>
                            <div className="compare__cell compare__cell--via">
                                {row.via === true ? <Check size={18} className="icon--green" /> :
                                    row.via === false ? <X size={18} className="icon--red" /> :
                                        row.via}
                            </div>
                            <div className="compare__cell compare__cell--others">
                                {row.others === true ? <Check size={18} className="icon--green" /> :
                                    row.others === false ? <X size={18} className="icon--red" /> :
                                        row.others}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Comparison;
