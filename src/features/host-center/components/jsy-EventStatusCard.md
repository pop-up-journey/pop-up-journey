1. 시멘틱 태그 수정

- label : form과 연결용으로 주로 씀
  단순 텍스트에 label 사용,

````tsx
      <aside className="text-right text-sm text-gray-500">
        <p>
          <label>조회수: </label>
          {views} | <label>관심등록수: </label>
          {likes}
          <br />
          <label>참여자수: </label>
          {participants}
        </p>
      </aside>

// -> 수정 후

      <aside className="text-right text-sm text-gray-500">
        <dl className="space-y-1">
          <div className="flex justify-between gap-4">
            <dt className="font-medium">조회수:</dt>
            <dd>{views}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium">관심등록수:</dt>
            <dd>{likes}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-medium">참여자수:</dt>
            <dd>{participants}</dd>
          </div>
        </dl>
      </aside>
      ```
````
