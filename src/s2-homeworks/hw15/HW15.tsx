import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
      .get<{ techs: TechType[]; totalCount: number }>(
        "https://samurai.it-incubator.io/api/3.0/homework/test3",
        { params }
      )
      .catch((e) => {
        alert(e.response?.data?.errorText || e.message);
      });
}

const HW15 = () => {
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(4)
    const [idLoading, setLoading] = useState(false)
    const [totalCount, setTotalCount] = useState(100)
    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: any) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                if(res) {
                    setTechs(res.data.techs);
                    setTotalCount(res.data.totalCount)
                    setLoading(false)
                }
                // делает студент

                // сохранить пришедшие данные

                //
            })
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        // console.log('newpage:', newPage, 'newCount:', newCount);
        if(typeof newPage === 'number' ) {
            searchParams.delete("page");
            setSearchParams((p) =>
              p.has("sort") || p.has('select') ? `${p}&page=${newPage}` : `page=${newPage}`
            );
            setPage(newPage)
            sendQuery({ page: newPage });
        }

        if(typeof newCount === 'number') {
          setCount(newCount);
          sendQuery({ count: newCount });
          setSearchParams(`select=${newCount}`)
        }
            

        // sendQuery({ page: newCount });
        // делает студент

        // setPage(
        // setCount(

        // sendQuery(
        // setSearchParams(

        //
    }

    const onChangeSort = (newSort: string) => {
        debugger
        // делает студент
        setSort(newSort)
        sendQuery({ sort: newSort, count: count });
        if(newSort) {
            searchParams.delete("sort");
            setSearchParams((p) =>
              p.has("page") || p.has('select') ? `${p}&sort=${newSort}` : `sort=${newSort}`
            );
        } else {
            searchParams.delete("sort");
           setSearchParams((p) => p); 
        }
        // setSort(
        // setPage(1) // при сортировке сбрасывать на 1 страницу

        // sendQuery(
        // setSearchParams(

        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t.id} className={s.row}>
            <div id={'hw15-tech-' + t.id} className={s.tech}>
                {t.tech}
            </div>

            <div id={'hw15-developer-' + t.id} className={s.developer}>
                {t.developer}
            </div>
        </div>
    ))

    return (
        <div id={'hw15'}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={'hw15-loading'} className={s.loading}>Loading...</div>}

                <SuperPagination
                    page={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort sort={sort} value={'tech'} onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort sort={sort} value={'developer'} onChange={onChangeSort}/>
                    </div>
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15