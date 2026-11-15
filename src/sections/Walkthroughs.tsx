import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { workVideos } from '../data/media';
import { WorkVideoPlayer } from '../components/WorkVideoPlayer';
import { SmartImage } from '../components/SmartImage';
import { useEnquiry } from '../context/EnquiryContext';

export function Walkthroughs() {
  const [selectedId, setSelectedId] = useState(workVideos[0]!.id);
  const selected = workVideos.find(video => video.id === selectedId)!;
  const { openEnquiry } = useEnquiry();
  return (
    <section id="walkthroughs" className="section walkthrough-section" aria-labelledby="walkthroughs-title">
      <span id="renovation" className="scroll-anchor" />
      <div className="container-x">
        <div className="walkthrough-heading"><div><p className="eyebrow">Inside our work</p><h2 id="walkthroughs-title" className="h-section">See the space.<br /><em>Feel the detail.</em></h2></div><p>Walk through the interiors, explore the carpentry and see the installations up close.</p></div>
        <div className="walkthrough-layout">
          <div className="walkthrough-feature">
            <WorkVideoPlayer key={selected.id} video={selected} />
            <div className="walkthrough-description" aria-live="polite"><p className="eyebrow">{selected.label}</p><h3>{selected.title}</h3><p>{selected.description}</p><button type="button" className="text-link" onClick={() => openEnquiry({ service: selected.service, message: `I would like to discuss work similar to the video "${selected.title}".`, source: `Video: ${selected.title}` })}>Discuss a similar project <ArrowUpRight size={17} /></button></div>
          </div>
          <div className="walkthrough-playlist" role="group" aria-label="Choose a project video">
            <p className="playlist-heading">The film collection <span>{String(workVideos.length).padStart(2, '0')}</span></p>
            {workVideos.map((video, index) => <button key={video.id} type="button" className="walkthrough-choice" aria-pressed={selected.id === video.id} onClick={() => setSelectedId(video.id)}><span className="video-choice-thumb"><SmartImage src={video.poster} alt="" width={80} height={100} sizes="80px" /><Play size={16} fill="currentColor" aria-hidden /></span><span className="video-choice-text"><span>{String(index + 1).padStart(2, '0')} / {video.label}</span><strong>{video.title}</strong><small>{video.duration} · {selected.id === video.id ? 'Selected' : 'View video'}</small></span><ArrowUpRight size={18} aria-hidden /></button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
