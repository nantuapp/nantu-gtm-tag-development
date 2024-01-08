function()
{
  if(/nantu_environment=qa/.test(location.search) || /nantu_environment=qa/.test(document.cookie))
  {
      return "qa";
  }
  
   return "production"; 
}