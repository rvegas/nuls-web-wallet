import {fetch, post, put} from './https'

/**
 * 投票列表
 * @param params
 * @returns {Promise}
 */
export const getVotesList = (params) => post('/v1/votes',params);

/**
 * 投票历史列表
 * @param params
 * @returns {Promise}
 */
export const getVotesHistoryList = (params) => post('/v1/votes/history',params);

/**
 * 创建投票
 * @param params
 * @returns {Promise}
 */
export const getCreateVote = (params) => post('/v2/vote/create',params);

/**
 * 创建投票时获取手续费
 * @param params
 * @returns {Promise}
 */
export const getCreateVoteFee = (params) => post('/v1/gas/createVote',params);

/**
 * 投票详情
 * @param voteId
 * @returns {Promise}
 */
export const getVoteDetail = (voteId) => fetch('/v1/vote/details/'+voteId);

/**
 * 账户是否投过票
 * @param params
 * @returns {Promise}
 */
export const getUserHasVoted = (params) => post('/v1/vote/hasVoted',params);

/**
 * 投票详情中的展开列表
 * @param params
 * @returns {Promise}
 */
export const getVoteDetailOpenList = (params) => post('/v1/vote/item/users',params);

/**
 * 发起投票
 * @param params
 * @returns {Promise}
 */
export const getVote = (params) => post('/v2/vote/publish',params);

/**
 * 发起投票时获取手续费
 * @param params
 * @returns {Promise}
 */
export const getVoteFee = (params) => post('/v1/gas/vote',params);






