import React from 'react' // eslint-disable-line
import styled from 'styled-components'

const CopyAlert = styled.div`
  user-select: none;
  p {
    padding: 21px 10px;
    border-radius: 16px;
    background: rgba(73, 73, 73, 0.8);
    color: #ffffff;
    text-align: center;
    position: fixed;
    top: 54px;
    left: 50%;
    margin: auto;
    transform: translate(-50%, 0);
    opacity: 0;
    display: none;
  }

  .animate {
    animation-duration: 2s;
    animation-fill-mode: both;
    //z-index：To ensure "已複製連結至剪貼簿" always appear on top and are not obscured when using the package across different projects.
    z-index: 9999;
    display: block;
  }

  .fadeOut {
    animation-name: fadeOut;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

/**
 * @param {Object} props
 * @param {boolean} [props.showAlert]
 * @return {JSX.Element}
 */

export default function Alert({ showAlert }) {
  return (
    <CopyAlert>
      <p className={showAlert ? 'animate fadeOut' : 'copy-alert'}>
        已複製連結至剪貼簿
      </p>
    </CopyAlert>
  )
}
