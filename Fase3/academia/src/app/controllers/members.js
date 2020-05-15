const Intl = require('intl')
const { age, date } = require ('../../lib/utils.js')
const Member = require('../models/member')

module.exports = {
    index (req, res){
        Member.all(function(members) {
        return res.render('members/index', {members})
    })
    },
    //show
    show (req, res){
        Member.find(req.params.id, function(member){
            if(!member) return res.send('Member Not Found!')
            member.birth = date(member.birth).birthDay
            
            return res.render('members/show', {member})
        })
    },
    //create
    post (req, res){
        
       Member.create(req.body, function(member){

        return res.redirect(`/members/${member.id}`)
       })
       
    },
    //edit
    edit (req, res){
        
        Member.find(req.params.id, function(member){
            if(!member) return res.send('Member Not Found!')
            member.birth = date(member.birth).iso
            
            return res.render('members/edit', {member})
        })
    },
    // put
    put (req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if( req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }
        Member.update(req.body, function(err){
            if(err) throw"Write file Error!"

            return res.redirect(`/members/${req.body.id}`)
        })
    },
    // delete
    delete (req,res){
        Member.delete(req.body.id, function(){
            return res.redirect(`/members`)
        })
    }
}