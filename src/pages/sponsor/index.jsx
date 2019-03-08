import React from 'react';
import ReactDOM from 'react-dom';
import { Pagination } from '@alifd/next';
import 'whatwg-fetch'; // fetch polyfill

import Language from '../../components/language';
import Header from '../../components/header';
import Bar from '../../components/bar';
import Footer from '../../components/footer';
import docsConfig from '../../../site_config/sponsors';
import '../../css/common.css';

import { httpUrl, isNull, pageSize } from '../../common';

class Documentation extends Language {

    constructor(props) {
        super(props);
        this.state = {
        __html: '',
        total: 1,
        page: 1,
        pageList: []
        };
    }

    componentDidMount() {
        this.pageList()
    }

    // 获取捐赠信息列表
    pageList (page) {
        if(isNull(page)) {
            page = 1;
        }
        httpUrl('get', 'https://txlcn.org/pay/page?nowPage=' + page + '&pageSize=' + pageSize, '', null, res => {
            this.setState({
                pageList: res.list,
                total: res.total
            })
        })
    }

    // 点击分页
    pageChange (page) {
        this.setState({
            page: page
        })
        this.pageList(page)
    }
    render() {
        const language = this.getLanguage();
        const dataSource = docsConfig[language];
        console.log(dataSource)
        return (
            <div className="documentation-page">
                <Header
                currentKey="docs"
                type="normal"
                logo="/img/txlcn.png"
                language={language}
                onLanguageChange={this.onLanguageChange}
                />
                <Bar img="/img/system/1.png" text={dataSource.barText} />
                <div className="footer-container Y-background-color-white">
                    <div className="footer-body">
                        <div>
                            {dataSource.sidemenu.map((item, index) => {
                                return (
                                    <div  key={index}>
                                        {item.title == '捐献项目'? 
                                        <div>
                                            <div className="Y-font-size-18">
                                                <span style={{width: '5px',height: '20px',background: '#27424a',display: 'inline-block'}} className="Y-vertical-align-middle Y-margin-vertical-bottom-5 Y-margin-horizontal-right-10"></span>{item.title}
                                            </div>
                                            <div style={{lineHeight: '24px',color: '#27424a'}} className="Y-font-size-16 Y-padding-vertical-top-25">
                                            {item.content}
                                            </div>
                                            <div className="Y-padding-vertical-top-10 Y-text-align-right Y-font-size-16" style={{color: '#27424a'}}>-- {item.author}</div>
                                        </div>
                                        :''}
                                        {item.title == 'Donations to project'? 
                                        <div>
                                            <div className="Y-font-size-18">
                                                <span style={{width: '5px',height: '20px',background: '#27424a',display: 'inline-block'}} className="Y-vertical-align-middle Y-margin-vertical-bottom-5 Y-margin-horizontal-right-10"></span>{item.title}
                                            </div>
                                            <div style={{lineHeight: '24px',color: '#27424a'}} className="Y-font-size-16 Y-padding-vertical-top-25">
                                            {item.content}
                                            </div>
                                            <div className="Y-padding-vertical-top-10 Y-text-align-right Y-font-size-16" style={{color: '#27424a'}}>-- {item.author}</div>
                                        </div>
                                        :''}
                                    </div>
                                    
                                )
                            })}
                            
                        </div>
                        <div className="Y-font-size-18 Y-padding-vertical-top-25">
                            {dataSource.sidemenu.map((item, index) => {
                                return (
                                    <div  key={index}>
                                        {item.title == '捐献方式'? 
                                        <div>
                                            <div className="Y-font-size-18">
                                                <span style={{width: '5px',height: '20px',background: '#27424a',display: 'inline-block'}} className="Y-vertical-align-middle Y-margin-vertical-bottom-5 Y-margin-horizontal-right-10"></span>{item.title}
                                            </div>
                                            <div className="Y-text-align-center">
                                                <img src='/img/erweima.png' alt="" style={{width: '250px', height: '250px',margin: '20px auto'}} /> 
                                            </div>
                                            <div>
                                                <div style={{width: '200px',background: '#27424a',margin: '0px auto 25px'}} className="Y-font-color-white Y-text-align-center Y-padding-vertical-both-10">{item.content}</div>
                                            </div>
                                        </div>
                                        :''}
                                        {item.title == 'Giving way'? 
                                        <div>
                                            <div className="Y-font-size-18">
                                                <span style={{width: '5px',height: '20px',background: '#27424a',display: 'inline-block'}} className="Y-vertical-align-middle Y-margin-vertical-bottom-5 Y-margin-horizontal-right-10"></span>{item.title}
                                            </div>
                                            <div className="Y-text-align-center">
                                                <img src='/img/erweima.png' alt="" style={{width: '250px', height: '250px',margin: '20px auto'}} /> 
                                            </div>
                                            <div>
                                                <div style={{width: '200px',background: '#27424a',margin: '0px auto 25px'}} className="Y-font-color-white Y-text-align-center Y-padding-vertical-both-10">{item.content}</div>
                                            </div>
                                        </div>
                                        :''}
                                    </div>
                                    
                                )
                            })}
                        </div>

                        <div className="Y-font-size-18 Y-padding-vertical-top-25">
                            {dataSource.sidemenu.map((item, index) => {
                                return (
                                    <div  key={index}>
                                        {item.title == '捐献记录'? 
                                        <div>
                                            <div className="Y-font-size-18">
                                                <span style={{width: '5px',height: '20px',background: '#27424a',display: 'inline-block'}} className="Y-vertical-align-middle Y-margin-vertical-bottom-5 Y-margin-horizontal-right-10"></span>{item.title}
                                            </div>
                                        </div>
                                        :''}
                                        {item.title == 'Donation record'? 
                                        <div>
                                            <div className="Y-font-size-18">
                                                <span style={{width: '5px',height: '20px',background: '#27424a',display: 'inline-block'}} className="Y-vertical-align-middle Y-margin-vertical-bottom-5 Y-margin-horizontal-right-10"></span>{item.title}
                                            </div>
                                        </div>
                                        :''}
                                    </div>
                                )
                            })}
                            <div className="Y-margin-vertical-both-25 Y-font-size-16">
                                <div>
                                    {dataSource.sidemenu.map((item, index) => {
                                        return (
                                            <div  key={index}>
                                                {item.title == '捐献记录'? 
                                                <div className="Y-flexbox-horizontal Y-font-size-16" style={{background: '#27424a'}}>
                                                    {item.content.map((item1, idx) => {
                                                        return (
                                                            <div className="Y-flex-item Y-font-color-white Y-padding-vertical-both-8 Y-text-align-center" key={idx}>
                                                                {item1.name}<span className="Y-font-sie-12 Y-padding-horizontal-left-5">{item.author}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :''}
                                                {item.title == 'Donation record'? 
                                                <div className="Y-flexbox-horizontal Y-font-size-16" style={{background: '#27424a'}}>
                                                    {item.content.map((item1, idx) => {
                                                        return (
                                                            <div className="Y-flex-item Y-font-color-white Y-padding-vertical-both-8 Y-text-align-center" key={idx}>
                                                                {item1.name}<span className="Y-font-sie-12 Y-padding-horizontal-left-5">{item1.author}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                :''}
                                            </div>
                                            
                                        )
                                    })}
                                </div>
                                {this.state.pageList.map((item, index) => {
                                    return (
                                        <div className="Y-flexbox-horizontal Y-font-size-16 Y-padding-vertical-both-15" style={{borderBottom: '1px solid #2a6070'}} key={index}>
                                            <div className="Y-flex-item Y-text-align-center">
                                            {item.account}
                                            </div>
                                            <div className="Y-flex-item Y-text-align-center">
                                            {item.money}
                                            </div>
                                            <div className="Y-flex-item Y-text-align-center">
                                            {item.createTime}
                                            </div>
                                            <div className="Y-flex-item Y-text-align-center">
                                            {item.projectName}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="Y-text-align-center Y-clear-both  Y-margin-vertical-both-25">
                                <Pagination current={this.state.page} hideOnlyOnePage total={this.state.total} onChange={this.pageChange.bind(this)} />
                            </div>

                        </div>
                    </div>
                </div>
                <Footer logo="/img/txlcn.png" language={language} />
        </div>
        );
    }
}

document.getElementById('root') && ReactDOM.render(<Documentation />, document.getElementById('root'));

export default Documentation;