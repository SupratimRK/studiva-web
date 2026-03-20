import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle, HelpCircle } from 'lucide-react';
import './FAQ.css';

const faqs = [
    {
        q: "How do I start earning from my notes?",
        a: "It's simple: Upload your PDF or scan handwritten notes, set your price (Free, Paid, or Rewarded Ad), and publish. Once a student unlocks your note, the earnings are credited to your dashboard instantly."
    },
    {
        q: "Is there a limit on how many notes I can upload?",
        a: "Not at all. You can upload an unlimited number of notes. In fact, creators with 50+ notes tend to earn 3x more due to higher visibility in search results."
    },
    {
        q: "What is the revenue share on Studyvia?",
        a: "We offer the most creator-friendly model in the market. You keep 70% of all sales. For rewarded ads, we split the ad revenue 50/50, ensuring students can access content for free while you still get paid."
    },
    {
        q: "How can I withdraw my earnings?",
        a: "Withdrawals are processed via UPI or direct Bank Transfer. You can request a withdrawal anytime once you cross the ₹100 threshold, and funds usually hit your account within 24 hours."
    },
    {
        q: "Can I upload notes for any exam or subject?",
        a: "Yes! While we are most popular for JEE, NEET, and CBSE, we support 50+ categories including UPSC, CA Foundation, CLAT, Engineering subjects, and more."
    },
    {
        q: "Is it safe to share my notes? What about piracy?",
        a: "We take piracy seriously. Notes on Studyvia are served in a secure viewer that prevents direct downloading (unless you enable it). Each page is watermarked with the creator's username for added security."
    }
];

const FAQItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <div
            className={`faq-item card ${isOpen ? 'faq-item--open' : ''}`}
            id={`faq-${index}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="faq-item__header">
                <h3 className="faq-item__q">{faq.q}</h3>
                <span className="faq-item__toggle">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="faq-item__body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <p className="faq-item__a">{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    return (
        <section className="faq" id="faq">
            <div className="container">
                <div className="faq__head">
                    <div className="faq__icon-wrap">
                        <HelpCircle size={24} className="faq__main-icon" />
                    </div>
                    <span className="label">Questions</span>
                    <h2 className="section-title">Got Questions? We've Got Answers.</h2>
                    <p className="section-sub">Everything you need to know about the Studyvia platform, monetisation, and security.</p>
                </div>

                <div className="faq__grid">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} faq={faq} index={i} />
                    ))}
                </div>

                <div className="faq__footer">
                    <div className="faq__support card">
                        <MessageCircle size={20} className="faq__support-icon" />
                        <span>Still have questions? <a href="mailto:support@studyvia.com">Chat with our support team</a>. We're here to help.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
