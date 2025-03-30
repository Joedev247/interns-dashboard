import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Comment } from '../../types';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent className="pt-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-blue-700 dark:text-blue-300 font-semibold">
                  {comment.user.username[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{comment.user.username}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{comment.body}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;