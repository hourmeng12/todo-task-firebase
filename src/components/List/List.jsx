import React from 'react';

import ListItem from './ListItem';
import defaultListsId from '../../constant/defaultListId';

const List = ({ lists }) => {
  return (
    <ul className="space-y-2">
      {lists.map((list) => {
        if (defaultListsId.includes(list.id)) {
          return null;
        }

        return (
          <li key={list.id}>
            <ListItem
              id={list.id}
              theme={list.theme}
              tasksCount={list.tasksCount}
              option
            >
              {list.name}
            </ListItem>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
