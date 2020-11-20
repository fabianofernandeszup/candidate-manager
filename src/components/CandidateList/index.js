import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdSelectAll, MdDelete, MdCheck } from 'react-icons/md';

import SkeletonEffect from '../../components/SkeletonEffect';
import candidatesapi from '../../services/candidatesapi.json';

export default function CandidateList({ textInput, candidates }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const candidateName = candidatesapi
    .filter((filterName) => filterName.name.first === textInput)
    .map((item) => item.name.first)
    .toString();

  const handleErrorNotification = () => {
    return alert(
      'Desculpa, no momento estamos sofrendo algumas instabilidades no sistema. Por favor, retorne mais tarde.',
    );
  };

  if (isLoading) {
    return (
      <section className="candidateslist">
        <SkeletonEffect />
      </section>
    );
  } else if (!isLoading && !textInput) {
    return (
      <section className="candidateslist">
        {candidates.map((item) => (
          <main key={item.login.uuid}>
            <Link to={`/candidates/${item.login.uuid}`}>
              <div>
                <img src={item.picture.thumbnail} alt={item.name.first} />
                <h2>{item.name.first}</h2>
              </div>
            </Link>
            <div>
              <p>{item.email}</p>

              <p>{item.phone}</p>

              <p>{item.location.city}</p>
            </div>

            <div>
              <MdDelete
                onClick={handleErrorNotification}
                size={26}
                color="#a9a9a9"
              />
              <MdSelectAll
                onClick={handleErrorNotification}
                size={26}
                color="#a9a9a9"
              />
              <MdCheck
                onClick={handleErrorNotification}
                size={26}
                color="#a9a9a9"
              />
            </div>
          </main>
        ))}
      </section>
    );
  } else {
    return (
      <section className="candidateslist">
        {textInput !== candidateName ? (
          <SkeletonEffect />
        ) : (
          candidates
            .filter((candidate) => candidate.name.first === textInput)
            .map((item) => (
              <main key={item.login.uuid}>
                <Link to={`/candidates/${item.login.uuid}`}>
                  <div>
                    <img src={item.picture.thumbnail} alt={item.name.first} />
                    <h2>{item.name.first}</h2>
                  </div>
                </Link>
                <div>
                  <p>{item.email}</p>

                  <p>{item.phone}</p>

                  <p>{item.location.city}</p>
                </div>

                <div>
                  <MdDelete
                    onClick={handleErrorNotification}
                    size={26}
                    color="#a9a9a9"
                  />
                  <MdSelectAll
                    onClick={handleErrorNotification}
                    size={26}
                    color="#a9a9a9"
                  />
                  <MdCheck
                    onClick={handleErrorNotification}
                    size={26}
                    color="#a9a9a9"
                  />
                </div>
              </main>
            ))
        )}
      </section>
    );
  }
}
