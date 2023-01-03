import React, { useState } from 'react';
// import TopicCard from '../topicCard';
import Header from '../headers/HomepageHeader';
import Image from 'next/image';
import Link from 'next/link';
import { BsEyeFill } from 'react-icons/bs';
import { GiLoveHowl } from 'react-icons/gi';
import TopicBottom from './topicBottom';
import Replys from '../replys';
import TopicCard from '../topicCard';
import { relativeDate } from '../../utils/dayjs';
export interface SingleTopicProps {
  topic: any;
  topicLikes: any;
  topicSaved: object;
}
export default function SingleTopic({
  topic,
  topicLikes,
  topicSaved,
}: SingleTopicProps) {
  const [followingState, setFollowingState] = useState(false);

  const [isReply, setIsReply] = useState(false);

  const toggleFollow = () => {
    if (followingState) {
      setFollowingState(false);
    } else {
      setFollowingState(true);
    }
  };
  const Newtopics = topic.Category.topics.filter((newtopic: any) => {
    return newtopic.id !== topic.id;
  });
  console.log(topic);

  const toggleReply = () => {
    if (isReply) {
      setIsReply(false);
    } else {
      setIsReply(true);
    }
  };
  return (
    <>
      {isReply ? <Replys toggleReply={toggleReply} /> : null}
      <div className={`${isReply ? 'hidden' : null} px-[16px] w-full pb-8`}>
        <Header />
        <div className='pb-[70px] px-2'>
          <div className='flex border-[#000] text-lg whitespace-nowrap pt-2 space-x-2'>
            <div>
              {topic.author.profileImgUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/profileimage/${topic.author.profileImgUrl}`}
                  width={64}
                  height={64}
                  alt='avatar'
                  className='rounded-lg object-cover'
                />
              ) : (
                <Image
                  src={`/tesla.PNG`}
                  width={64}
                  height={64}
                  alt='avatar'
                  className='rounded-lg object-cover'
                />
              )}
            </div>
            <div className='flex items-center space-y-3 w-full space-x-1 justify-between'>
              <div className='item-center justify-center'>
                <div className='space-x-3'>
                  <Link href='#'>
                    <a className='font-bold'>{topic.author.username}</a>
                  </Link>
                  {/* <span
                    onClick={toggleFollow}
                    className={` border-2 rounded-full px-2 text-sm`}
                  >
                    {followingState ? 'following' : 'Follow'}
                  </span> */}
                </div>
                <div className='flex space-x-2 text-xs'>
                  <span>{relativeDate(topic.createdDate, true)} ago</span>{' '}
                  <div className='flex space-x-1 items-center'>
                    <BsEyeFill />
                    <span>{topic.viwes}</span>
                  </div>
                  <Link href={`/categories/${topic.Category.slug}`}>
                    {topic.Category.title}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {topic.coverImageUrl ? (
            <div className='relative md:h-[300px] w-full h-[200px]'>
              <Image
                src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/coverimage/${topic.coverImageUrl}`}
                layout='fill'
                className='absolute object-cover'
                alt={topic.title}
              />
            </div>
          ) : null}
          <div className=' flex flex-col  border-[#000] mb-1'>
            <h2
              className={`${
                topic.trashed ? 'text-[#f50909]' : ''
              } md:text-2xl text-xl pt-3 pb-1  font-semibold leading-5`}
            >
              {topic.title}
            </h2>
          </div>
          <div className='border-b my-5 bg-[#ff9912] text-[#ff9912]'></div>
          <div
            dangerouslySetInnerHTML={{ __html: topic.content }}
            className={`${
              topic.trashed ? 'text-[#f50909]' : ''
            } text-justify text-sm leading-7 `}
          ></div>
          <div id='ezoic-pub-ad-placeholder-609'> </div>
          {topic.upload.lenght ? (
            <div className='items-center w-full flex flex-col border border-black p-1 py-3 rounded-md my-4'>
              {topic.upload.map((upload: any) => {
                return (
                  <div
                    className='border-black p-1 py-3 rounded-md'
                    key={upload.id}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/topic/${upload.link}`}
                      alt=''
                      width={400}
                      height={200}
                      className='object-cover'
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div className=' pb-60 '>
        <h2 className='border-b mx-1 border-black'>--Related Topics</h2>
        {Newtopics.map((topic: any) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
      {isReply ? null : (
        <TopicBottom
          topic={topic}
          topicLikes={topicLikes}
          toggleReply={toggleReply}
          topicSaved={topicSaved}
        />
      )}
    </>
  );
}
